/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import SideNavBar from './components/SideNavBar';
import DashboardView from './components/DashboardView';
import FlowsListView from './components/FlowsListView';
import FlowFormView from './components/FlowFormView';
import FlowDetailView from './components/FlowDetailView';
import ExecutionDetailModal from './components/ExecutionDetailModal';
import LiveSimulationModal from './components/LiveSimulationModal';
import { Flow, Execution } from './types';
import { INITIAL_FLOWS, INITIAL_EXECUTIONS } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'flows' | 'create' | 'detail'>('dashboard');
  const [flows, setFlows] = useState<Flow[]>([]);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [flowToEdit, setFlowToEdit] = useState<Flow | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(null);
  const [activeSimulationFlow, setActiveSimulationFlow] = useState<Flow | null>(null);

  // Load initial dataset from localStorage or fallback to defaults
  useEffect(() => {
    const savedFlows = localStorage.getItem('flowengine_flows');
    const savedExecutions = localStorage.getItem('flowengine_executions');

    if (savedFlows) {
      try {
        setFlows(JSON.parse(savedFlows));
      } catch (e) {
        setFlows(INITIAL_FLOWS);
      }
    } else {
      setFlows(INITIAL_FLOWS);
      localStorage.setItem('flowengine_flows', JSON.stringify(INITIAL_FLOWS));
    }

    if (savedExecutions) {
      try {
        setExecutions(JSON.parse(savedExecutions));
      } catch (e) {
        setExecutions(INITIAL_EXECUTIONS);
      }
    } else {
      setExecutions(INITIAL_EXECUTIONS);
      localStorage.setItem('flowengine_executions', JSON.stringify(INITIAL_EXECUTIONS));
    }
  }, []);

  // Save current dataset on mutations
  const updateFlowsState = (newFlows: Flow[]) => {
    setFlows(newFlows);
    localStorage.setItem('flowengine_flows', JSON.stringify(newFlows));
  };

  const updateExecutionsState = (newExecutions: Execution[]) => {
    setExecutions(newExecutions);
    localStorage.setItem('flowengine_executions', JSON.stringify(newExecutions));
  };

  const handleNavigate = (view: 'dashboard' | 'flows' | 'create') => {
    setCurrentView(view);
    setFlowToEdit(null);
    if (view !== 'flows') {
      setSelectedFlow(null);
    }
  };

  const handleSelectFlow = (flow: Flow) => {
    setSelectedFlow(flow);
    setCurrentView('detail');
  };

  const handleEditFlow = (flow: Flow) => {
    setFlowToEdit(flow);
    setCurrentView('create');
  };

  const handleDeleteFlow = (flowId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this automation flow? This action is irreversible.");
    if (confirmDelete) {
      const updatedFlows = flows.filter(f => f.id !== flowId);
      updateFlowsState(updatedFlows);
      
      // If deleted active details, go back to flows list
      if (selectedFlow && selectedFlow.id === flowId) {
        setSelectedFlow(null);
        setCurrentView('flows');
      }
    }
  };

  const handleSaveFlow = (savedFlow: Flow) => {
    let updatedFlows: Flow[];
    const exists = flows.some(f => f.id === savedFlow.id);

    if (exists) {
      updatedFlows = flows.map(f => f.id === savedFlow.id ? savedFlow : f);
    } else {
      updatedFlows = [savedFlow, ...flows];
    }

    updateFlowsState(updatedFlows);
    setSelectedFlow(savedFlow);
    setCurrentView('detail');
  };

  const handleSaveSimulationRun = (simulationResult: Execution) => {
    // Save execution record
    const updatedExecutions = [simulationResult, ...executions];
    updateExecutionsState(updatedExecutions);

    // Update the lastRun timestamp for this specific flow in state
    const updatedFlows = flows.map(flow => {
      if (flow.id === simulationResult.flowId || flow.name === simulationResult.flowName) {
        return {
          ...flow,
          lastRun: 'Just now'
        };
      }
      return flow;
    });
    updateFlowsState(updatedFlows);

    // If currently viewing active details, keep synced
    if (selectedFlow && (selectedFlow.id === simulationResult.flowId || selectedFlow.name === simulationResult.flowName)) {
      setSelectedFlow(prev => prev ? { ...prev, lastRun: 'Just now' } : null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#131313] text-[#e5e2e1]">
      {/* Fixed Left Navigation Rail */}
      <SideNavBar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Container Right View Canvas */}
      <div className="ml-[240px] flex-1 flex flex-col min-h-screen">
        {currentView === 'dashboard' && (
          <DashboardView
            flows={flows}
            executions={executions}
            onSelectExecution={setSelectedExecution}
            onNavigateToFlows={() => handleNavigate('flows')}
            onEmitEvent={setActiveSimulationFlow}
          />
        )}

        {currentView === 'flows' && (
          <FlowsListView
            flows={flows}
            onSelectFlow={handleSelectFlow}
            onEditFlow={handleEditFlow}
            onDeleteFlow={handleDeleteFlow}
          />
        )}

        {currentView === 'create' && (
          <FlowFormView
            flowToEdit={flowToEdit}
            onSave={handleSaveFlow}
            onCancel={() => {
              if (flowToEdit) {
                setCurrentView('detail');
              } else {
                handleNavigate('flows');
              }
            }}
          />
        )}

        {currentView === 'detail' && selectedFlow && (
          <FlowDetailView
            flow={selectedFlow}
            executions={executions}
            onBack={() => handleNavigate('flows')}
            onEdit={handleEditFlow}
            onEmitEvent={setActiveSimulationFlow}
            onSelectExecution={setSelectedExecution}
          />
        )}
      </div>

      {/* Modal overlays overlay stack */}
      {selectedExecution && (
        <ExecutionDetailModal
          execution={selectedExecution}
          onClose={() => setSelectedExecution(null)}
        />
      )}

      {activeSimulationFlow && (
        <LiveSimulationModal
          flow={activeSimulationFlow}
          onClose={() => setActiveSimulationFlow(null)}
          onSaveSimulation={handleSaveSimulationRun}
        />
      )}
    </div>
  );
}
