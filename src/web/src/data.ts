/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flow, Execution } from './types';

export const INITIAL_FLOWS: Flow[] = [
  {
    id: 'flow_user_onboarding',
    name: 'User Onboarding Sync',
    description: 'Synchronizes new user data from auth provider to CRM and triggers welcome email sequence.',
    status: 'Active',
    eventKey: 'evt_usr_signup',
    webhookKey: 'wh_user_signup',
    icon: 'webhook',
    stepsCount: 12,
    lastRun: '2m ago',
    createdDate: 'Oct 24, 2023',
    steps: [
      {
        id: 'step_1',
        name: 'Receive Webhook',
        type: 'Trigger',
        payload: JSON.stringify({
          extract: ['user_id', 'email', 'name'],
          validate: true
        }, null, 2)
      },
      {
        id: 'step_2',
        name: 'Enrich Customer Data',
        type: 'HTTP',
        integrationKey: 'clearbit_v2',
        operationKey: 'person.find',
        payload: JSON.stringify({
          email: '{{step_1.email}}',
          fields: ['company', 'role', 'seniority']
        }, null, 2)
      },
      {
        id: 'step_3',
        name: 'Provision Workspace',
        type: 'Action',
        integrationKey: 'slack_v2',
        operationKey: 'channel.create',
        payload: JSON.stringify({
          channel_name: 'welcome-{{step_1.name}}',
          invite_users: ['{{step_1.email}}']
        }, null, 2)
      }
    ]
  },
  {
    id: 'flow_daily_metrics',
    name: 'Daily Metrics Aggregation',
    description: 'Pulls analytics from multiple sources, computes daily summaries, and updates warehouse.',
    status: 'Draft',
    eventKey: 'cron_daily_0000',
    webhookKey: 'wh_daily_agg',
    icon: 'database',
    stepsCount: 5,
    lastRun: 'Yesterday',
    createdDate: 'Oct 23, 2023',
    steps: [
      {
        id: 'step_1',
        name: 'Fetch Stripe Sales',
        type: 'Trigger',
        payload: JSON.stringify({
          period: 'last_24h',
          include_refunds: true
        }, null, 2)
      },
      {
        id: 'step_2',
        name: 'Aggregate Metrics',
        type: 'Transform',
        payload: JSON.stringify({
          metrics: ['gross_volume', 'net_revenue', 'new_customers'],
          groupby: 'currency'
        }, null, 2)
      },
      {
        id: 'step_3',
        name: 'Write to BigQuery',
        type: 'Action',
        integrationKey: 'bq_v1',
        operationKey: 'rows.insert',
        payload: JSON.stringify({
          dataset: 'finance',
          table: 'daily_revenue',
          rows: '{{step_2.aggregated}}'
        }, null, 2)
      }
    ]
  },
  {
    id: 'flow_marketing_campaign',
    name: 'Marketing Campaign B',
    description: 'Automated drip campaign for Q3 product launch. Paused pending copy approval.',
    status: 'Paused',
    eventKey: 'evt_tag_added',
    webhookKey: 'wh_marketing_b',
    icon: 'mail',
    stepsCount: 8,
    lastRun: 'Oct 12',
    createdDate: 'Oct 12, 2023',
    steps: [
      {
        id: 'step_1',
        name: 'Tag Added Listener',
        type: 'Trigger',
        payload: JSON.stringify({
          tag: 'nurture_q3',
          platform: 'intercom'
        }, null, 2)
      },
      {
        id: 'step_2',
        name: 'Wait Timer',
        type: 'Transform',
        payload: JSON.stringify({
          duration: '3 days'
        }, null, 2)
      },
      {
        id: 'step_3',
        name: 'Send Customer.io Mail',
        type: 'Action',
        integrationKey: 'customer_io',
        operationKey: 'email.send_transactional',
        payload: JSON.stringify({
          template_id: 'drip_1_intro',
          recipient: '{{step_1.email}}'
        }, null, 2)
      }
    ]
  },
  {
    id: 'flow_order_processing',
    name: 'Order Processing',
    description: 'Processes incoming sales, maps checkout items, and performs fraud check integrations.',
    status: 'Active',
    eventKey: 'order.created',
    webhookKey: 'wh_order_created',
    icon: 'api',
    stepsCount: 4,
    lastRun: '2m ago',
    createdDate: 'Oct 24, 2023',
    steps: [
      {
        id: 'step_1',
        name: 'Parse Order Data',
        type: 'Transform',
        payload: JSON.stringify({
          operation: 'map_fields',
          source: '{{event.payload}}',
          mapping: {
            customer_id: '$.user.id',
            total: '$.cart.grand_total'
          }
        }, null, 2)
      },
      {
        id: 'step_2',
        name: 'Validate Customer',
        type: 'HTTP',
        integrationKey: 'hubspot_v3',
        operationKey: 'contact.upsert',
        payload: JSON.stringify({
          email: '{{step_1.customer_id}}',
          amount: '{{step_1.total}}'
        }, null, 2)
      }
    ]
  }
];

export const INITIAL_EXECUTIONS: Execution[] = [
  {
    id: 'ex_8f2a1b9',
    flowId: 'flow_user_onboarding',
    flowName: 'User Onboarding Sync',
    status: 'Success',
    triggeredAt: 'Oct 24, 02:00 AM',
    finishedAt: 'Oct 24, 02:03 AM',
    duration: '3.24s',
    triggerPayload: JSON.stringify({
      event_id: 'evt_90021xkL99',
      type: 'customer.subscription.created',
      data: {
        customer_id: 'cus_O219xk',
        plan: 'enterprise_tier_1',
        metadata: {
          source: 'marketing_campaign_q4'
        }
      }
    }, null, 2),
    steps: [
      {
        id: 'ex_step_1',
        name: 'Receive Webhook',
        type: 'Stripe Trigger',
        startedAt: '14:02:11.000',
        duration: '45ms',
        status: 'Success'
      },
      {
        id: 'ex_step_2',
        name: 'Enrich Customer Data',
        type: 'Internal API',
        startedAt: '14:02:11.045',
        duration: '820ms',
        status: 'Success',
        outputPayload: JSON.stringify({
          status: 200,
          data: {
            enrichment_score: 98,
            company_domain: 'acmecorp.com',
            employee_count: 4500,
            industry: 'Technology'
          }
        }, null, 2)
      },
      {
        id: 'ex_step_3',
        name: 'Provision Workspace',
        type: 'Platform Action',
        startedAt: '14:02:11.865',
        duration: '2.37s',
        status: 'Success'
      }
    ]
  },
  {
    id: 'ex_3c7d4e2',
    flowId: 'flow_invoice_processor',
    flowName: 'Invoice Processor',
    status: 'Failed',
    triggeredAt: 'Oct 23, 11:45 PM',
    finishedAt: 'Oct 23, 11:46 PM',
    duration: '1.12s',
    triggerPayload: JSON.stringify({
      invoice_id: 'inv_abc123',
      amount: 1500,
      currency: 'usd'
    }, null, 2),
    steps: [
      {
        id: 'ex_step_1',
        name: 'Invoice Webhook',
        type: 'Trigger',
        startedAt: '23:45:11.000',
        duration: '30ms',
        status: 'Success'
      },
      {
        id: 'ex_step_2',
        name: 'Verify Client PDF',
        type: 'Action',
        startedAt: '23:45:11.030',
        duration: '1.09s',
        status: 'Failed',
        outputPayload: JSON.stringify({
          error: 'PDF corruption detected. Unable to extract raw invoice items.',
          code: 'ERR_PARSING_FAILED'
        }, null, 2)
      }
    ]
  },
  {
    id: 'ex_9k5m2p8',
    flowId: 'flow_daily_metrics',
    flowName: 'Data Warehouse Ingest',
    status: 'Running',
    triggeredAt: 'Oct 23, 10:15 PM',
    finishedAt: '--',
    duration: 'Running...',
    triggerPayload: JSON.stringify({
      job_name: 'nightly_warehouse_load',
      triggered_by: 'scheduler'
    }, null, 2),
    steps: [
      {
        id: 'ex_step_1',
        name: 'Trigger Sync Pipeline',
        type: 'Cron Trigger',
        startedAt: '22:15:00.000',
        duration: '120ms',
        status: 'Success'
      },
      {
        id: 'ex_step_2',
        name: 'Ingest Postgres Records',
        type: 'Database Read',
        startedAt: '22:15:00.120',
        duration: 'Still executing...',
        status: 'Running'
      }
    ]
  },
  {
    id: 'ex_1a4v7n3',
    flowId: 'flow_weekly_report',
    flowName: 'Weekly Report Gen',
    status: 'Success',
    triggeredAt: 'Oct 23, 08:00 AM',
    finishedAt: 'Oct 23, 08:05 AM',
    duration: '5m 0s',
    triggerPayload: JSON.stringify({
      report_type: 'weekly_engagement',
      recipients: ['team@flowengine.io']
    }, null, 2),
    steps: [
      {
        id: 'ex_step_1',
        name: 'Gather Activity Stats',
        type: 'Trigger',
        startedAt: '08:00:00.000',
        duration: '4.2s',
        status: 'Success'
      },
      {
        id: 'ex_step_2',
        name: 'Compile PDF Document',
        type: 'Action',
        startedAt: '08:00:04.200',
        duration: '12.8s',
        status: 'Success'
      },
      {
        id: 'ex_step_3',
        name: 'Email Report Dispatch',
        type: 'Action',
        startedAt: '08:00:17.000',
        duration: '4m 43s',
        status: 'Success'
      }
    ]
  }
];
