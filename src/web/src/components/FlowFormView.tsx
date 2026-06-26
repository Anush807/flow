/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Rocket, AlertCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { Flow, Step, FlowStatus, StepType } from '../types';

interface FlowFormViewProps {
  flowToEdit?: Flow | null;
  onSave: (flow: Flow) => void;
  onCancel: () => void;
}

export default function FlowFormView({
  flowToEdit,
  onSave,
  onCancel
}: FlowFormViewProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<FlowStatus>('Active');
  const [eventKey, setEventKey] = useState('');
  const [webhookKey, setWebhookKey] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize fields if editing
  useEffect(() => {
    if (flowToEdit) {
      setName(flowToEdit.name);
      setStatus(flowToEdit.status);
      setEventKey(flowToEdit.eventKey);
      setWebhookKey(flowToEdit.webhookKey);
      setSteps(flowToEdit.steps);
    } else {
      // Default initial steps for a brand new flow
      setName('');
      setStatus('Active');
      setEventKey('');
      setWebhookKey('');
      setSteps([
        {
          id: 'step_new_1',
          name: 'Extract Payload',
          type: 'Trigger',
          payload: JSON.stringify({ extract: ["user_id", "email"], validate: true }, null, 2)
        }
      ]);
    }
    setValidationError(null);
  }, [flowToEdit]);

  const handleAddStep = () => {
    const newId = `step_new_${Date.now()}`;
    const newStep: Step = {
      id: newId,
      name: `Step ${steps.length + 1}`,
      type: 'Action',
      integrationKey: '',
      operationKey: '',
      payload: JSON.stringify({ mapping: { info: "{{step_1.value}}" } }, null, 2)
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (indexToRemove: number) => {
    if (steps.length === 1) {
      setValidationError("A workflow must have at least one execution step.");
      return;
    }
    const newSteps = steps.filter((_, idx) => idx !== indexToRemove);
    setSteps(newSteps);
    setValidationError(null);
  };

  const handleStepChange = (index: number, updatedFields: Partial<Step>) => {
    const newSteps = steps.map((step, idx) => {
      if (idx === index) {
        return { ...step, ...updatedFields };
      }
      return step;
    });
    setSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim()) {
      setValidationError("Flow Name is required.");
      return;
    }
    if (!eventKey.trim()) {
      setValidationError("Event Trigger Key is required.");
      return;
    }

    // Validate step payloads
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (!step.name.trim()) {
        setValidationError(`Step #${i + 1} Name cannot be blank.`);
        return;
      }
      try {
        JSON.parse(step.payload);
      } catch (err: any) {
        setValidationError(`Step #${i + 1} ("${step.name}") has invalid JSON syntax: ${err.message}`);
        return;
      }
    }

    // Create flow object
    const savedFlow: Flow = {
      id: flowToEdit ? flowToEdit.id : `flow_${Date.now()}`,
      name: name.trim(),
      description: flowToEdit ? flowToEdit.description : `Custom automated workflow triggered on ${eventKey.trim()}.`,
      status,
      eventKey: eventKey.trim(),
      webhookKey: webhookKey.trim() || `wh_${eventKey.trim()}`,
      icon: steps[0]?.type === 'Trigger' ? 'webhook' : 'api',
      stepsCount: steps.length,
      lastRun: flowToEdit ? flowToEdit.lastRun : 'Never run',
      createdDate: flowToEdit ? flowToEdit.createdDate : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      steps
    };

    onSave(savedFlow);
  };

  return (
    <div className="flex-grow flex flex-col min-h-screen">
      {/* TopAppBar header */}
      <header className="flex justify-between items-center h-16 px-6 bg-[#131313] border-b border-[#2A2A2A] sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="text-[#d1c1d9] hover:text-[#e5e2e1] transition-colors p-2 rounded-full hover:bg-[#201f1f] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-[#e5e2e1]">
            {flowToEdit ? `Edit Flow: ${flowToEdit.name}` : 'Create Flow'}
          </h2>
        </div>
      </header>

      {/* Main Form Content Canvas */}
      <main className="p-6 max-w-4xl mx-auto w-full space-y-8 flex-1 pb-16">
        {validationError && (
          <div className="bg-red-950/40 border border-red-500/50 rounded-lg p-4 flex gap-3 text-red-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-semibold">Configuration Error</p>
              <p className="mt-1 text-xs opacity-90">{validationError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: General Flow Configuration */}
          <section className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-6 space-y-6">
            <div className="border-b border-[#2a2a2a] pb-2">
              <h3 className="text-base font-semibold text-[#e5e2e1]">Flow Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#d1c1d9]">Flow Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., User Onboarding Sync"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2.5 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all placeholder-[#555]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#d1c1d9]">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as FlowStatus)}
                  className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2.5 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#d1c1d9]">Event Trigger Key</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., user.created"
                  value={eventKey}
                  onChange={(e) => setEventKey(e.target.value)}
                  className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2.5 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all placeholder-[#555] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#d1c1d9]">Webhook Key (Optional)</label>
                <input
                  type="text"
                  placeholder="wh_..."
                  value={webhookKey}
                  onChange={(e) => setWebhookKey(e.target.value)}
                  className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2.5 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all placeholder-[#555] font-mono"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Step Timeline Builder */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-2">
              <h3 className="text-base font-semibold text-[#e5e2e1]">Steps Builder</h3>
              <span className="text-xs text-[#d1c1d9] font-medium">{steps.length} {steps.length === 1 ? 'Step Defined' : 'Steps Defined'}</span>
            </div>

            <div className="relative pl-6 space-y-6">
              {/* Timeline Connector Line */}
              <div className="absolute left-2.5 top-5 bottom-5 w-0.5 bg-[#2a2a2a]"></div>

              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-5 relative group"
                >
                  {/* Step Number Circle Indicator */}
                  <div className="absolute -left-[30px] top-4 w-7 h-7 rounded-full bg-[#131313] border-2 border-[#2a2a2a] flex items-center justify-center font-bold text-xs text-[#d1c1d9] z-10">
                    {idx + 1}
                  </div>

                  {/* Remove Step button */}
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="absolute right-4 top-4 text-[#d1c1d9] hover:text-red-400 p-1.5 rounded-md hover:bg-[#131313]/50 transition-colors cursor-pointer"
                      title="Delete Step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#d1c1d9]">Step Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Enrich Customer Data"
                        value={step.name}
                        onChange={(e) => handleStepChange(idx, { name: e.target.value })}
                        className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all placeholder-[#555]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#d1c1d9]">Type</label>
                      <select
                        value={step.type}
                        onChange={(e) => handleStepChange(idx, { type: e.target.value as StepType })}
                        className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all"
                      >
                        <option value="Trigger">Trigger</option>
                        <option value="Action">Action</option>
                        <option value="Transform">Transform</option>
                        <option value="HTTP">HTTP</option>
                      </select>
                    </div>

                    {/* Conditional inputs for API Integrations */}
                    {(step.type === 'Action' || step.type === 'HTTP') && (
                      <>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-[#d1c1d9]">Integration Client Key</label>
                          <input
                            type="text"
                            placeholder="e.g., hubspot_v3"
                            value={step.integrationKey || ''}
                            onChange={(e) => handleStepChange(idx, { integrationKey: e.target.value })}
                            className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-[#d1c1d9]">Operation Key</label>
                          <input
                            type="text"
                            placeholder="e.g., contact.upsert"
                            value={step.operationKey || ''}
                            onChange={(e) => handleStepChange(idx, { operationKey: e.target.value })}
                            className="w-full bg-[#171717] border border-[#2A2A2A] rounded-md p-2 text-sm text-[#e5e2e1] focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all font-mono"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Step Payload JSON editor box */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-[#d1c1d9]">Config Payload (JSON)</label>
                    <textarea
                      rows={4}
                      value={step.payload}
                      onChange={(e) => handleStepChange(idx, { payload: e.target.value })}
                      className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-md p-3 text-xs text-[#e5e2e1] font-mono focus:border-[#9D00FF] focus:ring-1 focus:ring-[#9D00FF] outline-none transition-all"
                      placeholder='{\n  "key": "value"\n}'
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Steps Actions footer inside section */}
            <div className="flex items-center justify-between pt-6 border-t border-[#2A2A2A] mt-6">
              <button
                type="button"
                onClick={handleAddStep}
                className="px-5 py-2 rounded-lg border border-[#9D00FF] text-[#dfb7ff] font-medium text-xs hover:bg-[#9D00FF]/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>

              <button
                type="submit"
                className="bg-[#9D00FF] hover:bg-[#8c00e5] text-white px-6 py-2 rounded-lg font-medium text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(157,0,255,0.2)] active:scale-95"
              >
                <span>Submit Flow</span>
                <Rocket className="w-4 h-4" />
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
