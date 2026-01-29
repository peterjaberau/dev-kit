const localStorage = {
  widget_all_dashboards_config: {
    columns: ["name", "location", "recentlyViewed", "updatedDate", "owner", "sharing", "_columnPlaceholder"],
    filters: { dashboardFilters: [] },
    sort: { dir: "desc", field: "recentlyViewed" },
  },
  group_id: "36698333",
  group_properties: {
    groupType: "workspace",
    workspaceId: "36698333",
    workspaceDomain: "gmail.com",
    workspaceName: "Peter Jaber's Workspace",
    planCode: "1",
    planName: "Free Forever",
    planTier: "FreeForever",
    trialPlanName: null,
    createdAt: "2022-04-03T18:57:21.023Z",
    memberCount: 1,
    MRR: 0,
    sessionId: "1769660903",
    clientId: "86313017.1769660904",
    sessionNumber: 1,
    enabledClickapps: [
      "priorities",
      "sprints",
      "emails",
      "tags",
      "custom_fields",
      "multiple_assignees",
      "time_tracking",
      "time_tracking_rollup",
      "time_estimates",
      "time_estimates_rollup",
      "check_unresolved",
      "dependency_warning",
      "remap_due_dates",
      "remap_dependencies",
      "recorder",
      "automation",
      "giphy",
      "live_view",
      "threaded_comments",
      "milestones",
      "user_presence",
      "lineup",
      "unstarted_status_group",
      "nested_subtasks",
      "microsoft_365_preview",
      "extra_comment_reactions",
      "universal_search",
      "ai_enabled",
      "notetaker_enabled",
      "chat_enabled",
      "status_pies",
      "use_relative_dates",
    ],
    nonGuestMemberCount: 1,
    pricePerSeat: "0.00",
    billingUsersCount: 1,
    guestCount: 0,
  },
  user_traits: {
    address: { street: null },
    createdAt: "2022-04-03T18:56:34.525Z",
    domain: "gmail.com",
    email: "peterjaberau@gmail.com",
    firstName: "Peter",
    id: 48763417,
    language: "en-GB",
    lastName: "Jaber",
    phone: null,
    timezone: "Australia/Sydney",
    workspaceMemberships: ["36698333"],
    platform: "Web",
    appVersion: "4.2.6",
    isMobile: false,
    sessionId: "1769660903",
    clientId: "86313017.1769660904",
    sessionNumber: 1,
    cuVersionTaskView: "4.0",
    tier: "FreeForever",
  },
  access_management: {
    allow_task_memebers_from_store: {
      changeNumber: 1764016394458,
      trafficTypeName: "workspace",
      name: "access-management-allow-task-members-from-store",
      trafficAllocation: 100,
      trafficAllocationSeed: 1300470000,
      seed: 596632689,
      status: "ACTIVE",
      killed: false,
      defaultTreatment: "off",
      algo: 2,
      conditions: [
        {
          conditionType: "WHITELIST",
          matcherGroup: {
            combiner: "AND",
            matchers: [
              {
                keySelector: null,
                matcherType: "IN_SEGMENT",
                negate: false,
                userDefinedSegmentMatcherData: {
                  segmentName: "aclv3-workspaces",
                },
                whitelistMatcherData: null,
                unaryNumericMatcherData: null,
                betweenMatcherData: null,
                dependencyMatcherData: null,
                booleanMatcherData: null,
                stringMatcherData: null,
                betweenStringMatcherData: null,
                userDefinedLargeSegmentMatcherData: null,
              },
            ],
          },
          partitions: [
            {
              treatment: "on",
              size: 100,
            },
          ],
          label: "whitelisted segment",
        },
        {
          conditionType: "ROLLOUT",
          matcherGroup: {
            combiner: "AND",
            matchers: [
              {
                keySelector: {
                  trafficType: "workspace",
                  attribute: null,
                },
                matcherType: "ALL_KEYS",
                negate: false,
                userDefinedSegmentMatcherData: null,
                whitelistMatcherData: null,
                unaryNumericMatcherData: null,
                betweenMatcherData: null,
                dependencyMatcherData: null,
                booleanMatcherData: null,
                stringMatcherData: null,
                betweenStringMatcherData: null,
                userDefinedLargeSegmentMatcherData: null,
              },
            ],
          },
          partitions: [
            {
              treatment: "on",
              size: 0,
            },
            {
              treatment: "off",
              size: 100,
            },
          ],
          label: "default rule",
        },
      ],
      configurations: {},
      sets: ["frontend"],
      impressionsDisabled: false,
    },
    authenticated_views: {
      changeNumber: 1768202368932,
      trafficTypeName: "workspace",
      name: "access-management-authenticated-views",
      trafficAllocation: 100,
      trafficAllocationSeed: 46139497,
      seed: 1539927273,
      status: "ACTIVE",
      killed: false,
      defaultTreatment: "off",
      algo: 2,
      conditions: [
        {
          conditionType: "WHITELIST",
          matcherGroup: {
            combiner: "AND",
            matchers: [
              {
                keySelector: null,
                matcherType: "WHITELIST",
                negate: false,
                userDefinedSegmentMatcherData: null,
                whitelistMatcherData: {
                  whitelist: [
                    "14359551",
                    "36202826",
                    "65532",
                    "9009043568",
                    "9011374995",
                    "9011734398",
                    "9012198894",
                    "90131734702",
                    "9014799329",
                  ],
                },
                unaryNumericMatcherData: null,
                betweenMatcherData: null,
                dependencyMatcherData: null,
                booleanMatcherData: null,
                stringMatcherData: null,
                betweenStringMatcherData: null,
                userDefinedLargeSegmentMatcherData: null,
              },
            ],
          },
          partitions: [{ treatment: "on", size: 100 }],
          label: "whitelisted",
        },
        {
          conditionType: "ROLLOUT",
          matcherGroup: {
            combiner: "AND",
            matchers: [
              {
                keySelector: { trafficType: "workspace", attribute: null },
                matcherType: "ALL_KEYS",
                negate: false,
                userDefinedSegmentMatcherData: null,
                whitelistMatcherData: null,
                unaryNumericMatcherData: null,
                betweenMatcherData: null,
                dependencyMatcherData: null,
                booleanMatcherData: null,
                stringMatcherData: null,
                betweenStringMatcherData: null,
                userDefinedLargeSegmentMatcherData: null,
              },
            ],
          },
          partitions: [
            { treatment: "on", size: 0 },
            { treatment: "off", size: 100 },
          ],
          label: "default rule",
        },
      ],
      configurations: {},
      sets: ["backend", "frontend"],
      impressionsDisabled: false,
    },
  },
}


const indexDB = {
  _key: "ChatOrganisableSidebar",
  _value: {
    featureName: "ChatOrganisableSidebar",
    instanceId: "c7d01498-7913-4c4d-b2dc-826fa6ff6af7",
    persistedAt: 1769662163827,
    state: {
      currentSidebarMode: "groups",
      groups: { entities: {}, ids: [], roomToGroupMap: {} },
      recent: { entities: {}, ids: [], roomToGroupMap: {} },
    },
    version: 1,
  },
}


const user = {
  email_validated: true,
  phone_validated: false,
  user: {
    id: 48763417,
    username: "Peter Jaber",
    email: "peterjaberau@gmail.com",
    hmac: "5350c4591488a8bc775cbb2f74a467dac622dd2595d7b877351ed7ac10529e8a",
    phone: null,
    description: null,
    color: "#ea80fc",
    initials: "PJ",
    date_joined: "1649012194525",
    joined: true,
    invited_by: [],
    profilePicture: null,
    profileInfo: {
      verified_consultant: null,
      top_tier_user: null,
      verified_ambassador: null,
      viewed_verified_consultant: null,
      viewed_top_tier_user: null,
      viewed_verified_ambassador: null,
      display_profile: true,
      ai_expert: null,
      viewed_ai_expert: null,
    },
    gh_authed: false,
    demo_data_done: false,
    tour_cards_done: true,
    tour_cards_data: null,
    onboarding_step: "completed",
    android_onboarding_done: false,
    default_team: "36698333",
    default_project: null,
    default_category: null,
    default_subcategory: null,
    twenty_four_hr_setting: null,
    week_start_day: null,
    show_coverimages: true,
    date_format: null,
    post_with_cmd: null,
    reverse_statuses: null,
    theme_color: "#595d66",
    density: 1,
    hotkeys: true,
    dont_add_harvest_task_ids: null,
    scratchpad: true,
    onboarding_data: {
      onboard_type: "new_team",
    },
    segmentation_questions: {
      userid: "48763417",
      workspace_id: "36698333",
      outcomes: ["project_management"],
      experience_level: null,
      department: "Personal Use",
      role: null,
      manager: null,
      discovered_via: "search_engine",
      team_size: "1",
      date_created: "1649012241491",
    },
    markdown_shortcuts: true,
    dropbox_enabled: true,
    drive_enabled: true,
    one_drive_enabled: true,
    box_enabled: true,
    pop_up_preference: 1,
    onboarding_incentive_accepted: false,
    seen_time_estimate_warning: false,
    onboarding_video_steps: null,
    onboarding_opt_out: true,
    show_celebrations: true,
    has_seen_mobile_onboarding: false,
    rtl_mode: false,
    dashboard_size: 1,
    bouncing: false,
    dark_theme: false,
    contrast: 0,
    block_tz_change_modal: null,
    hide_breadcrumbs_when_sorting: null,
    inbox_breadcrumbs: null,
    tour_cards: {
      create_task_tour_completed: false,
      multitask_tour_completed: false,
      notifications_tour_completed: false,
      view_task_tour_completed: false,
      category_tour_completed: null,
      list_select_tour_completed: null,
      comment_tour_completed: null,
      minimize_tour_completed: null,
      used_slash_commands: null,
    },
    timezone_offset: "-600",
    timezone: "Australia/Sydney",
    sso: {
      sso_requirement_violated: false,
      policies: [],
    },
    features: {
      harvest: null,
      toggl_check: true,
    },
    country_iso_code: "AU",
    user_data: {
      helpers: {
        onboarding_warning_shown: true,
      },
      teams_nux: true,
      calendarUi: {
        nux: true,
        weekends: true,
        eventTags: [],
        timezones: [],
        blockStyle: "subtle",
        glanceView: "day",
        migrations: {
          syncEntriesToDisplayCalendarsAndCalendarsForListView: true,
        },
        sidebarLayout: "day-view",
        gabShowTimeLeft: true,
        displayCalendars: ["nux"],
        sidebarCollapsed: false,
        anchoredForecasts: {},
        displayListsForView: {
          global: ["assignedToSelfAndDueDateSet"],
        },
        tasksBacklogFilters: {},
        aiNotetakerCalendars: [],
        calendarsForListView: [],
        desktopShowInMenubar: false,
        displayCancelledEvents: false,
        forecastTaskConstraints: {},
        tasksSidebarWidthForView: {
          global: 360,
        },
        shouldOpenAtWeekViewStart: true,
        sidebarSectionExpandedKey: "recent",
        aiNotetakerSkipPolicyAssetIDs: [],
      },
      $overrideKey: "calendarUi",
      cu3_waitlist: true,
      has_seen_chat: true,
      "calendarUi:36698333": {
        nux: true,
        timezones: [],
        blockStyle: "subtle",
        glanceView: "day",
        sidebarLayout: "tasks",
        gabShowTimeLeft: true,
        timeblockPrefix: "Work on",
        weekendsForView: {
          glance: true,
          global: true,
        },
        workingSchedule: {
          "0": {
            end: {
              hour: 18,
              minute: 0,
            },
            start: {
              hour: 8,
              minute: 0,
            },
          },
          "1": {
            end: {
              hour: 18,
              minute: 0,
            },
            start: {
              hour: 8,
              minute: 0,
            },
          },
          "2": {
            end: {
              hour: 18,
              minute: 0,
            },
            start: {
              hour: 8,
              minute: 0,
            },
          },
          "3": {
            end: {
              hour: 18,
              minute: 0,
            },
            start: {
              hour: 8,
              minute: 0,
            },
          },
          "4": {
            end: {
              hour: 18,
              minute: 0,
            },
            start: {
              hour: 8,
              minute: 0,
            },
          },
          "5": {
            end: {
              hour: 18,
              minute: 0,
            },
            start: {
              hour: 8,
              minute: 0,
            },
          },
          "6": {
            end: {
              hour: 18,
              minute: 0,
            },
            start: {
              hour: 8,
              minute: 0,
            },
          },
        },
        displayCalendars: ["nux"],
        sidebarCollapsed: false,
        alwaysConfirmSave: false,
        anchoredForecasts: {},
        displayListsForView: {
          global: [],
        },
        tasksBacklogFilters: {},
        aiNotetakerCalendars: [],
        calendarsForListView: [],
        desktopShowInMenubar: true,
        allDayCollapsedForView: {
          glance: true,
          global: true,
        },
        displayCancelledEvents: false,
        forecastTaskConstraints: {},
        tasksSidebarWidthForView: {
          global: 360,
        },
        shouldOpenAtWeekViewStart: true,
        showCalendarWeekIndicator: false,
        sidebarSectionExpandedKey: "backlog",
        sidebarSectionExpandedKeys: {
          backlog: true,
          overdue: false,
          assigned: false,
          priorities: true,
        },
        aiNotetakerSkipPolicyAssetIDs: [],
      },
      last_view_created_date: 1766092055258,
      seen_4_0_transition_modal: [36698333],
      hide_navigation_bar_labels: false,
      user_created_dashboard_view: {
        regularList: true,
      },
      hide_dashboard_hub_nux_video: true,
      personal_layout_4_0_toggle_on_ws: [],
      last_interaction_with_cards_in_chat: 1764111010838,
      user_closed_dashboard_view_nux_modal: {
        closed: true,
      },
      dashboards_hub_all_dashboards_setting: {
        sort: {
          dir: "desc",
          field: "recentlyViewed",
        },
        columns: ["name", "location", "recentlyViewed", "updatedDate", "owner", "sharing", "_columnPlaceholder", null],
      },
      chat_settings_has_interacted_with_room_sidebar: true,
    },
    imports_in_progress: [],
    global_font_support: true,
    skipCaptcha: false,
    last_2fa_prompt: null,
    twofa_enabled: "0",
    twofa_required: false,
    twofa_options: {
      text_enabled: false,
      totp_enabled: false,
    },
    require_2fa_count: 0,
    extended_logging: false,
    dashboard: 6,
    sidebar_theme: 0,
    bl: false,
    created_from_v2: true,
    onboarding_bonus_claimed: false,
    user_settings: [
      {
        name: "pinned_rec",
        value: false,
      },
      {
        name: "pinned_time_tracking",
        value: false,
      },
      {
        name: "pinned_reminder",
        value: false,
      },
      {
        name: "pinned_note",
        value: true,
      },
      {
        name: "pinned_doc",
        value: false,
      },
      {
        name: "pinned_tray",
        value: false,
      },
      {
        name: "country_holidays",
        value: [],
      },
      {
        name: "pinned_calendar",
        value: true,
      },
      {
        name: "show_stats_while_typing",
        value: false,
      },
      {
        name: "stats_target",
        value: "page",
      },
      {
        name: "focus_mode",
        value: "",
      },
      {
        name: "start_date_only_tasks",
        value: true,
      },
      {
        name: "calendar_settings",
        value: {},
      },
      {
        name: "search_name",
        value: true,
      },
      {
        name: "search_custom_fields",
        value: true,
      },
      {
        name: "search_description",
        value: true,
      },
      {
        name: "show_stats_details",
        value: null,
      },
      {
        name: "stats_active_detail",
        value: null,
      },
      {
        name: "show_quotes",
        value: null,
      },
      {
        name: "docs_focus_mode",
        value: true,
      },
      {
        name: "plain_urls",
        value: null,
      },
      {
        name: "task_view_v3",
        value: true,
      },
      {
        name: "custom_fields_manager",
        value: null,
      },
      {
        name: "task_view_mode",
        value: 0,
      },
      {
        name: "layout_v3",
        value: true,
      },
      {
        name: "toolbar_theme",
        value: null,
      },
      {
        name: "pinned_chat",
        value: true,
      },
      {
        name: "pinned_my_tasks",
        value: false,
      },
      {
        name: "pinned_whiteboard",
        value: false,
      },
      {
        name: "pinned_people",
        value: false,
      },
      {
        name: "pinned_sidebar_items",
        value: [
          "ai",
          "calendar",
          "my-work",
          "teams",
          "docs",
          "dashboards",
          "clips",
          "goals",
          "whiteboards",
          "home-spaces",
        ],
      },
      {
        name: "inbox_v3",
        value: true,
      },
      {
        name: "pinned_ai",
        value: true,
      },
      {
        name: "docs_comment_style",
        value: "minimal",
      },
      {
        name: "home_v3_enabled",
        value: null,
      },
      {
        name: "details_target",
        value: null,
      },
      {
        name: "pinned_dashboard",
        value: null,
      },
      {
        name: "pinned_home_special_items",
        value: [
          "inbox",
          "threads",
          "assigned",
          "my-work",
          "mentions",
          "drafts",
          "channels",
          "tasks",
          "spaces",
          "posts",
        ],
      },
    ],
  },
  teams: [
    {
      id: "36698333",
      color: "#1b5e20",
      trial_count: 1,
      using_github: false,
      using_gitlab: null,
      setup_step: "project",
      color_theme: null,
      personal_team: true,
      should_encrypt: false,
      gantt_trial_end: null,
      require_2fa: false,
      hours_per_day: null,
      plan_id: "1",
      billed_users_this_cycle: 1,
      minimum_seats: null,
      free_seats: null,
      billed_plan_id: "1",
      time_tracking_display_hours: true,
      time_estimate_display_hours: true,
      disable_public_sharing: null,
      disable_never_expire_pub_links: false,
      pub_links_max_year: false,
      estimates_per_assignee: null,
      points_per_assignee: null,
      nested_subtasks: true,
      nested_subtasks_level: 3,
      time_in_status: null,
      charge_for_internal_guests: true,
      quick_create_statuses: true,
      universal_search: true,
      microsoft_365_preview: true,
      extra_comment_reactions: true,
      trial_plan_id: null,
      allow_skip_2fa: true,
      lineup: true,
      threaded_comments: true,
      admin_public_share_override: true,
      enable_recorder: true,
      docs_home: true,
      hipaa_compliant: false,
      live_view: 2,
      automation_enabled: true,
      ai_enabled: true,
      user_presence: true,
      is_ai_hidden: false,
      task_relationships: true,
      can_add_guests: null,
      can_remove_guests: null,
      wip_limit: false,
      hide_everything_calendar: false,
      hide_everything_board: false,
      emails_as_replies: false,
      custom_sprint_duration: false,
      time_tracking_rollup: true,
      disable_template_pub_sharing: false,
      time_estimate_rollup: true,
      enable_codox: true,
      dashboards_enabled: true,
      unstarted_status_group: true,
      tasks_in_multiple_lists: true,
      subtasks_in_multiple_lists: false,
      points_estimate_rollup: false,
      giphy: true,
      points_scale: [1, 2, 3, 5, 8],
      custom_fields_legacy_ordering: false,
      role: 1,
      role_subtype: 0,
      date_joined: "1649012241023",
      date_invited: "1649012241023",
      invite: false,
      invited_by: null,
      receive_notifs_gh_commit: true,
      bypass_sso: null,
      owner: {
        id: 48763417,
        username: "Peter Jaber",
        email: "peterjaberau@gmail.com",
        color: "#ea80fc",
        initials: "PJ",
        profilePicture: null,
      },
      name: "Peter Jaber's Workspace",
      next_bill_date: "1680548241023",
      date_created: "1649012241023",
      service_status: 1,
      next_renewal_retry_date: null,
      grace_period_end: null,
      next_rollup_retry_date: null,
      rollup_grace_period_end: null,
      billingexceptionpopupdismissed: null,
      was_trial: false,
      stored_promo_code: null,
      address: null,
      dashboard_data_date: null,
      orderindex: "1",
      workspace_inaccessible: false,
      sso: {},
      plan_tier: "FreeForever",
      avatar: null,
      initials: "P",
      notification_settings: {
        receive_emails: true,
        new_task_notifs: 0,
        fields: {
          gh_commit: true,
        },
      },
      storage: 0.13,
      storage_per_user: 0,
      listViewSettings: {
        visible: {
          due_date: true,
          start_date: false,
          date_created: false,
          date_updated: true,
          priority: true,
          assignees: true,
          task_id: false,
          time_spent: false,
        },
        sorting: [],
      },
      member_count: "1",
      member_count_wo_invites: "1",
      time_tracking_default_to_billable: 0,
      task_duration: false,
      chat_context: {
        source: "auto-enablement",
      },
      chat_enabled: true,
      notetaker_enabled: true,
      user_schedules: {
        enabled: true,
      },
      role_key: "owner",
    },
  ],
}

const project = [
  {
    id: "54779505",
    owner: {
      id: 48763417,
      username: "Peter Jaber",
      email: "peterjaberau@gmail.com",
      color: "#ea80fc",
      initials: "PJ",
      profilePicture: null,
    },
    team: {
      id: "36698333",
      owner: {
        id: 48763417,
        username: "Peter Jaber",
        email: "peterjaberau@gmail.com",
        color: "#ea80fc",
        initials: "PJ",
        profilePicture: null,
      },
      using_github: false,
      using_gitlab: null,
      using_bitbucket: null,
      name: "Peter Jaber's Workspace",
      date_created: "1649012241023",
      avatar: null,
    },
    name: "Space",
    date_created: "1649012241082",
    private: false,
    multiple_assignees: false,
    slack_channel: null,
    import_id: null,
    import_uuid: null,
    importing: null,
    points: false,
    orderindex: 1,
    template: false,
    date_deleted: null,
    archived: false,
    deleted: false,
    content: null,
    color: null,
    due_date: null,
    due_date_time: false,
    creator: 48763417,
    storage_used: "58494",
    default_preset_view: null,
    preset_views: [1, 2],
    list_view_settings: null,
    board_view_settings: null,
    calendar_view_settings: null,
    gantt_view_settings: null,
    avatar_source: null,
    avatar_value: null,
    list_view_template: null,
    board_view_template: null,
    calendar_view_template: null,
    gantt_view_template: null,
    list_view_update_views: null,
    board_view_update_views: null,
    calendar_view_update_views: null,
    gantt_view_update_views: null,
    deleted_by: null,
    box_view_update_views: null,
    box_view_template: null,
    box_view_settings: null,
    permissions: {
      can_read: true,
      add_email_account: true,
      billing: true,
      can_add_team_guests: true,
      can_add_team_limited_members: true,
      can_add_team_members: true,
      can_add_workspace_attachments: true,
      can_be_added_to_spaces: true,
      can_be_added_to_user_groups: true,
      can_convert_item: true,
      can_create_agents: true,
      can_create_custom_permission_level: true,
      can_create_folders: true,
      can_create_goals: true,
      can_create_lists: true,
      can_create_milestone: true,
      can_create_personal_list: true,
      can_create_portfolios: true,
      can_create_projects: true,
      can_create_spaces: true,
      can_create_workload: true,
      can_create_workspace_doc: true,
      can_delete_comments: true,
      can_delete_custom_permission_level: true,
      can_delete_no_access: true,
      can_edit_agents: true,
      can_edit_custom_permission_level: true,
      can_edit_description: true,
      can_edit_integrations: true,
      can_edit_list_statuses: true,
      can_edit_privacy: 2,
      can_edit_project_settings: 2,
      can_edit_space_settings: 2,
      can_edit_team: true,
      can_edit_team_members: true,
      can_edit_team_owner: true,
      can_edit_trial: true,
      can_edit_user_groups: true,
      can_edit_view_protection: true,
      can_enable_sso: true,
      can_export_tasks: true,
      can_gdpr_export: true,
      can_import: true,
      can_list_inaccessible_spaces: true,
      can_make_tasks_public: true,
      can_manage_public_authn: true,
      can_manage_sharing: true,
      can_pin_fields: true,
      can_recover_inaccessible_spaces: false,
      can_see_custom_permission_level: true,
      can_see_data_retention_settings: true,
      can_see_team_members: true,
      can_see_workload: true,
      can_send_login_bypass_link: true,
      can_set_approval_settings: true,
      can_set_data_retention_settings: true,
      can_use_chat: true,
      can_use_git: true,
      can_use_public_api_dev_key: true,
      can_view_agents: true,
      can_create_vibeup_app: true,
      can_view_vibeup_app: true,
      can_edit_vibeup_app: true,
      can_create_vibeup_chat: true,
      can_view_vibeup_chat: true,
      can_edit_vibeup_chat: true,
      can_view_audit_logs: true,
      can_view_lineup_of_others: true,
      can_view_baselines: true,
      can_view_reporting: true,
      can_view_team_timesheet: true,
      chat_add_members: true,
      chat_create_channel: true,
      chat_create_dm: true,
      chat_delete_channel: true,
      create_automation: true,
      create_dashboards: true,
      create_public_view: true,
      custom_roles: true,
      make_views_public: true,
      make_items_public: true,
      manage_custom_fields: true,
      manage_custom_items: true,
      manage_statuses: true,
      manage_tags: true,
      manage_template_tags: true,
      oauth_apps: true,
      profile: true,
      public_spaces_visible: true,
      send_email: true,
      share: true,
      team_permissions: true,
      convert_custom_fields: true,
      create_custom_fields: true,
      delete_custom_fields: true,
      edit_custom_fields: true,
      merge_custom_fields: true,
      move_custom_fields: true,
      can_edit_tags: true,
      can_see_time_spent: true,
      can_see_time_estimated: true,
      can_see_points_estimated: true,
      add_attachments: true,
      add_checklists: true,
      add_dependencies: true,
      add_followers: true,
      add_self_follower: true,
      add_status: true,
      add_subtasks: true,
      add_tags: true,
      archive: true,
      can_add_automation: true,
      can_add_to_lineup: true,
      can_change_subtask_columns: true,
      can_change_task_links: true,
      can_create_baseline: true,
      can_create_folders_pl: false,
      can_create_lists_pl: false,
      can_create_relationships: true,
      can_create_tasks: true,
      can_delete_baseline: true,
      can_delete_checklist_item: true,
      can_edit_baseline: true,
      can_resolve_checklist_item_if_assigned: true,
      can_set_default_permission_level: true,
      change_assignee: 2,
      change_clickapps: true,
      change_description: true,
      change_due_date: true,
      change_incoming_address: true,
      change_points_estimate: true,
      change_priority: true,
      change_recurring: true,
      change_status: true,
      change_time_estimate: true,
      change_title: true,
      chat_add_followers: true,
      chat_add_self_follower: true,
      chat_comment: true,
      chat_manage_tiles: true,
      chat_remove_followers: true,
      chat_remove_members: true,
      chat_remove_self_follower: true,
      chat_reply: true,
      comment: true,
      create_private_view: false,
      create_view: true,
      delete: true,
      delete_view: true,
      duplicate: true,
      edit_attachments: true,
      edit_checklists: true,
      edit_goal: true,
      edit_list_details: true,
      edit_view: true,
      like_comments: true,
      manage_workspace_user_profile: true,
      merge: true,
      move_goal: true,
      move_task: true,
      remove_attachments: true,
      remove_dependencies: true,
      remove_followers: true,
      remove_self_follower: true,
      remove_status: true,
      remove_tags: true,
      set_custom_field_values: true,
      template: true,
      track_time: true,
      unshare: true,
      permission_level: 5,
      team_role: 1,
      team_role_subtype: 0,
    },
    public_sharing: null,
    zoom: false,
    template_field_ids: null,
    activity_view_template: null,
    activity_view_update_views: null,
    activity_view_settings: null,
    mind_map_view_template: null,
    mind_map_view_update_views: null,
    mind_map_view_settings: null,
    timeline_view_template: null,
    timeline_view_update_views: null,
    timeline_view_settings: null,
    table_view_template: null,
    table_view_update_views: null,
    table_view_settings: null,
    workload_view_template: null,
    workload_view_update_views: null,
    workload_view_settings: null,
    points_estimate_rollup: null,
    emails_as_replies: null,
    admin_can_manage: null,
    permanent_template_id: null,
    project_prefix: null,
    custom_task_ids_start_100: null,
    custom_task_ids_start: null,
    custom_task_ids_display: null,
    emails_clickapp: false,
    time_in_status: null,
    map_view_update_views: null,
    map_view_template: null,
    date_updated: "1649012241082",
    custom_items: false,
    priority: null,
    assignee: null,
    start_date: null,
    start_date_time: null,
    status: null,
    personal_list: null,
    project_type: null,
    is_hidden: false,
    project_orderindex: 1,
    hide_project: false,
    default_category: "90167549660",
    hidden: false,
    using_gitlab: null,
    using_bitbucket: null,
    avatar: null,
    features: {
      due_dates: {
        enabled: true,
        start_date: true,
        remap_due_dates: false,
        remap_closed_due_date: false,
      },
      sprints: {
        enabled: true,
      },
      time_tracking: {
        enabled: true,
        harvest: false,
        rollup: false,
        default_to_billable: 2,
      },
      points: {
        enabled: false,
      },
      custom_items: {
        enabled: false,
      },
      priorities: {
        enabled: true,
        priorities: [
          {
            color: "#f50000",
            id: "1",
            orderindex: "1",
            priority: "urgent",
          },
          {
            color: "#f8ae00",
            id: "2",
            orderindex: "2",
            priority: "high",
          },
          {
            color: "#6fddff",
            id: "3",
            orderindex: "3",
            priority: "normal",
          },
          {
            color: "#d8d8d8",
            id: "4",
            orderindex: "4",
            priority: "low",
          },
        ],
      },
      tags: {
        enabled: true,
      },
      check_unresolved: {
        enabled: true,
        subtasks: true,
        checklists: null,
        comments: null,
      },
      milestones: {
        enabled: true,
      },
      custom_fields: {
        enabled: true,
      },
      status_pies: {
        enabled: false,
      },
      scheduler_enabled: false,
      dependency_type_enabled: false,
      dependency_enforcement: {
        enforcement_enabled: false,
        enforcement_mode: 0,
      },
      reschedule_closed_dependencies: true,
    },
    statuses: [
      {
        id: "p54779505_x2oK1W4z",
        status: "to do",
        type: "open",
        orderindex: 0,
        color: "#87909e",
      },
      {
        id: "p54779505_qj98YGfF",
        status: "complete",
        type: "closed",
        orderindex: 1,
        color: "#008844",
      },
    ],
    permission_level: 5,
    automation_count: 0,
    taskcount: "0",
    listViewSettings: {
      visible: {
        due_date: true,
        start_date: false,
        date_created: false,
        date_updated: true,
        priority: true,
        assignees: true,
        task_id: false,
        time_spent: false,
      },
      sorting: [],
    },
    all_statuses: [
      {
        status: "to do",
        type: "open",
        orderindex: 0,
        colors: ["#87909e"],
      },
      {
        status: "Open",
        type: "open",
        orderindex: 1,
        colors: ["#87909e"],
      },
      {
        status: "needs update",
        type: "custom",
        orderindex: 2,
        colors: ["#e16b16"],
      },
      {
        status: "on hold",
        type: "custom",
        orderindex: 3,
        colors: ["#d33d44"],
      },
      {
        status: "in review",
        type: "custom",
        orderindex: 4,
        colors: ["#5f55ee"],
      },
      {
        status: "in development",
        type: "custom",
        orderindex: 5,
        colors: ["#1090e0"],
      },
      {
        status: "concept",
        type: "custom",
        orderindex: 6,
        colors: ["#f8ae00"],
      },
      {
        status: "published",
        type: "done",
        orderindex: 7,
        colors: ["#008844"],
      },
      {
        status: "ready",
        type: "done",
        orderindex: 8,
        colors: ["#64c6a2"],
      },
      {
        status: "Closed",
        type: "closed",
        orderindex: 9,
        colors: ["#008844"],
      },
      {
        status: "complete",
        type: "closed",
        orderindex: 10,
        colors: ["#008844"],
      },
    ],
    project_using_gitlab: null,
    project_using_bitbucket: null,
    _version_vector: {
      workspace_id: 36698333,
      object_type: "space",
      object_id: "54779505",
      vector: [
        {
          master_id: 2,
          version: 1694856327334000,
          deleted: false,
        },
      ],
    },
  },
  {
    id: "90164883300",
    owner: {
      id: 48763417,
      username: "Peter Jaber",
      email: "peterjaberau@gmail.com",
      color: "#ea80fc",
      initials: "PJ",
      profilePicture: null,
    },
    team: {
      id: "36698333",
      owner: {
        id: 48763417,
        username: "Peter Jaber",
        email: "peterjaberau@gmail.com",
        color: "#ea80fc",
        initials: "PJ",
        profilePicture: null,
      },
      using_github: false,
      using_gitlab: null,
      using_bitbucket: null,
      name: "Peter Jaber's Workspace",
      date_created: "1649012241023",
      avatar: null,
    },
    name: "Family",
    date_created: "1755853518285",
    private: false,
    multiple_assignees: true,
    slack_channel: null,
    import_id: null,
    import_uuid: null,
    importing: null,
    points: false,
    orderindex: 2,
    template: false,
    date_deleted: null,
    archived: false,
    deleted: false,
    content: '{"ops":[{"insert":"\\n","attributes":{"block-id":"block-84a24e32-139f-4ce7-9bbc-88c151d7aac9"}}]}',
    color: "#6e56cf",
    due_date: null,
    due_date_time: false,
    creator: 48763417,
    storage_used: "0",
    default_preset_view: 1,
    preset_views: [1, 2],
    list_view_settings: null,
    board_view_settings: null,
    calendar_view_settings: null,
    gantt_view_settings: null,
    avatar_source: "",
    avatar_value: "",
    list_view_template: null,
    board_view_template: null,
    calendar_view_template: null,
    gantt_view_template: null,
    list_view_update_views: null,
    board_view_update_views: null,
    calendar_view_update_views: null,
    gantt_view_update_views: null,
    deleted_by: null,
    box_view_update_views: null,
    box_view_template: null,
    box_view_settings: null,
    permissions: {
      can_read: true,
      add_email_account: true,
      billing: true,
      can_add_team_guests: true,
      can_add_team_limited_members: true,
      can_add_team_members: true,
      can_add_workspace_attachments: true,
      can_be_added_to_spaces: true,
      can_be_added_to_user_groups: true,
      can_convert_item: true,
      can_create_agents: true,
      can_create_custom_permission_level: true,
      can_create_folders: true,
      can_create_goals: true,
      can_create_lists: true,
      can_create_milestone: true,
      can_create_personal_list: true,
      can_create_portfolios: true,
      can_create_projects: true,
      can_create_spaces: true,
      can_create_workload: true,
      can_create_workspace_doc: true,
      can_delete_comments: true,
      can_delete_custom_permission_level: true,
      can_delete_no_access: true,
      can_edit_agents: true,
      can_edit_custom_permission_level: true,
      can_edit_description: true,
      can_edit_integrations: true,
      can_edit_list_statuses: true,
      can_edit_privacy: 2,
      can_edit_project_settings: 2,
      can_edit_space_settings: 2,
      can_edit_team: true,
      can_edit_team_members: true,
      can_edit_team_owner: true,
      can_edit_trial: true,
      can_edit_user_groups: true,
      can_edit_view_protection: true,
      can_enable_sso: true,
      can_export_tasks: true,
      can_gdpr_export: true,
      can_import: true,
      can_list_inaccessible_spaces: true,
      can_make_tasks_public: true,
      can_manage_public_authn: true,
      can_manage_sharing: true,
      can_pin_fields: true,
      can_recover_inaccessible_spaces: false,
      can_see_custom_permission_level: true,
      can_see_data_retention_settings: true,
      can_see_team_members: true,
      can_see_workload: true,
      can_send_login_bypass_link: true,
      can_set_approval_settings: true,
      can_set_data_retention_settings: true,
      can_use_chat: true,
      can_use_git: true,
      can_use_public_api_dev_key: true,
      can_view_agents: true,
      can_create_vibeup_app: true,
      can_view_vibeup_app: true,
      can_edit_vibeup_app: true,
      can_create_vibeup_chat: true,
      can_view_vibeup_chat: true,
      can_edit_vibeup_chat: true,
      can_view_audit_logs: true,
      can_view_lineup_of_others: true,
      can_view_baselines: true,
      can_view_reporting: true,
      can_view_team_timesheet: true,
      chat_add_members: true,
      chat_create_channel: true,
      chat_create_dm: true,
      chat_delete_channel: true,
      create_automation: true,
      create_dashboards: true,
      create_public_view: true,
      custom_roles: true,
      make_views_public: true,
      make_items_public: true,
      manage_custom_fields: true,
      manage_custom_items: true,
      manage_statuses: true,
      manage_tags: true,
      manage_template_tags: true,
      oauth_apps: true,
      profile: true,
      public_spaces_visible: true,
      send_email: true,
      share: true,
      team_permissions: true,
      convert_custom_fields: true,
      create_custom_fields: true,
      delete_custom_fields: true,
      edit_custom_fields: true,
      merge_custom_fields: true,
      move_custom_fields: true,
      can_edit_tags: true,
      can_see_time_spent: true,
      can_see_time_estimated: true,
      can_see_points_estimated: true,
      add_attachments: true,
      add_checklists: true,
      add_dependencies: true,
      add_followers: true,
      add_self_follower: true,
      add_status: true,
      add_subtasks: true,
      add_tags: true,
      archive: true,
      can_add_automation: true,
      can_add_to_lineup: true,
      can_change_subtask_columns: true,
      can_change_task_links: true,
      can_create_baseline: true,
      can_create_folders_pl: false,
      can_create_lists_pl: false,
      can_create_relationships: true,
      can_create_tasks: true,
      can_delete_baseline: true,
      can_delete_checklist_item: true,
      can_edit_baseline: true,
      can_resolve_checklist_item_if_assigned: true,
      can_set_default_permission_level: true,
      change_assignee: 2,
      change_clickapps: true,
      change_description: true,
      change_due_date: true,
      change_incoming_address: true,
      change_points_estimate: true,
      change_priority: true,
      change_recurring: true,
      change_status: true,
      change_time_estimate: true,
      change_title: true,
      chat_add_followers: true,
      chat_add_self_follower: true,
      chat_comment: true,
      chat_manage_tiles: true,
      chat_remove_followers: true,
      chat_remove_members: true,
      chat_remove_self_follower: true,
      chat_reply: true,
      comment: true,
      create_private_view: false,
      create_view: true,
      delete: true,
      delete_view: true,
      duplicate: true,
      edit_attachments: true,
      edit_checklists: true,
      edit_goal: true,
      edit_list_details: true,
      edit_view: true,
      like_comments: true,
      manage_workspace_user_profile: true,
      merge: true,
      move_goal: true,
      move_task: true,
      remove_attachments: true,
      remove_dependencies: true,
      remove_followers: true,
      remove_self_follower: true,
      remove_status: true,
      remove_tags: true,
      set_custom_field_values: true,
      template: true,
      track_time: true,
      unshare: true,
      permission_level: 5,
      team_role: 1,
      team_role_subtype: 0,
    },
    public_sharing: null,
    zoom: null,
    template_field_ids: null,
    activity_view_template: null,
    activity_view_update_views: null,
    activity_view_settings: null,
    mind_map_view_template: null,
    mind_map_view_update_views: null,
    mind_map_view_settings: null,
    timeline_view_template: null,
    timeline_view_update_views: null,
    timeline_view_settings: null,
    table_view_template: null,
    table_view_update_views: null,
    table_view_settings: null,
    workload_view_template: null,
    workload_view_update_views: null,
    workload_view_settings: null,
    points_estimate_rollup: null,
    emails_as_replies: null,
    admin_can_manage: false,
    permanent_template_id: null,
    project_prefix: null,
    custom_task_ids_start_100: null,
    custom_task_ids_start: null,
    custom_task_ids_display: null,
    emails_clickapp: true,
    time_in_status: null,
    map_view_update_views: null,
    map_view_template: null,
    date_updated: "1755853518285",
    custom_items: false,
    priority: null,
    assignee: null,
    start_date: null,
    start_date_time: false,
    status: null,
    personal_list: false,
    project_type: null,
    is_hidden: false,
    project_orderindex: 2,
    hide_project: false,
    default_category: "90166357565",
    hidden: false,
    using_gitlab: null,
    using_bitbucket: null,
    avatar: null,
    features: {
      due_dates: {
        enabled: true,
        start_date: true,
        remap_due_dates: false,
        remap_closed_due_date: false,
      },
      sprints: {
        enabled: false,
      },
      time_tracking: {
        enabled: true,
        harvest: false,
        rollup: true,
        default_to_billable: 2,
      },
      points: {
        enabled: false,
      },
      custom_items: {
        enabled: false,
      },
      priorities: {
        enabled: true,
        priorities: [
          {
            color: "#f50000",
            id: "1",
            orderindex: "1",
            priority: "urgent",
          },
          {
            color: "#f8ae00",
            id: "2",
            orderindex: "2",
            priority: "high",
          },
          {
            color: "#6fddff",
            id: "3",
            orderindex: "3",
            priority: "normal",
          },
          {
            color: "#d8d8d8",
            id: "4",
            orderindex: "4",
            priority: "low",
          },
        ],
      },
      tags: {
        enabled: true,
      },
      time_estimates: {
        enabled: true,
        rollup: true,
        per_assignee: false,
      },
      check_unresolved: {
        enabled: true,
        subtasks: null,
        checklists: null,
        comments: null,
      },
      milestones: {
        enabled: true,
      },
      custom_fields: {
        enabled: true,
      },
      remap_dependencies: {
        enabled: true,
      },
      dependency_warning: {
        enabled: true,
      },
      status_pies: {
        enabled: true,
      },
      multiple_assignees: {
        enabled: true,
      },
      emails: {
        enabled: true,
      },
      scheduler_enabled: false,
      dependency_type_enabled: false,
      dependency_enforcement: {
        enforcement_enabled: false,
        enforcement_mode: 0,
      },
      reschedule_closed_dependencies: true,
    },
    statuses: [
      {
        id: "p90164883300_U2dNMnJd",
        status: "to do",
        type: "open",
        orderindex: 0,
        color: "#87909e",
      },
      {
        id: "p90164883300_etGlfXwe",
        status: "in progress",
        type: "custom",
        orderindex: 1,
        color: "#5f55ee",
      },
      {
        id: "p90164883300_rg64FAVX",
        status: "complete",
        type: "closed",
        orderindex: 2,
        color: "#008844",
      },
    ],
    permission_level: 5,
    automation_count: 0,
    taskcount: "0",
    listViewSettings: {
      visible: {
        due_date: true,
        start_date: false,
        date_created: false,
        date_updated: true,
        priority: true,
        assignees: true,
        task_id: false,
        time_spent: false,
      },
      sorting: [],
    },
    all_statuses: [
      {
        status: "to do",
        type: "open",
        orderindex: 0,
        colors: ["#87909e"],
      },
      {
        status: "in progress",
        type: "custom",
        orderindex: 1,
        colors: ["#5f55ee"],
      },
      {
        status: "complete",
        type: "closed",
        orderindex: 2,
        colors: ["#008844"],
      },
    ],
    project_using_gitlab: null,
    project_using_bitbucket: null,
    _version_vector: {
      workspace_id: 36698333,
      object_type: "space",
      object_id: "90164883300",
      vector: [
        {
          master_id: 27,
          version: 1755853518795000,
          deleted: false,
        },
      ],
    },
  },
  {
    id: "90162239934",
    owner: {
      id: 48763417,
      username: "Peter Jaber",
      email: "peterjaberau@gmail.com",
      color: "#ea80fc",
      initials: "PJ",
      profilePicture: null,
    },
    team: {
      id: "36698333",
      owner: {
        id: 48763417,
        username: "Peter Jaber",
        email: "peterjaberau@gmail.com",
        color: "#ea80fc",
        initials: "PJ",
        profilePicture: null,
      },
      using_github: false,
      using_gitlab: null,
      using_bitbucket: null,
      name: "Peter Jaber's Workspace",
      date_created: "1649012241023",
      avatar: null,
    },
    name: "Brainstorming",
    date_created: "1731460921366",
    private: false,
    multiple_assignees: true,
    slack_channel: null,
    import_id: null,
    import_uuid: null,
    importing: null,
    points: false,
    orderindex: 4,
    template: false,
    date_deleted: null,
    archived: false,
    deleted: false,
    content: '{"ops":[{"insert":"\\n","attributes":{"block-id":"block-b9a49b1e-b983-458e-8c58-3870f4ff29a4"}}]}',
    color: "#6e56cf",
    due_date: null,
    due_date_time: false,
    creator: 48763417,
    storage_used: "17218917",
    default_preset_view: 1,
    preset_views: [1, 20],
    list_view_settings: null,
    board_view_settings: null,
    calendar_view_settings: null,
    gantt_view_settings: null,
    avatar_source: "",
    avatar_value: "",
    list_view_template: null,
    board_view_template: null,
    calendar_view_template: null,
    gantt_view_template: null,
    list_view_update_views: null,
    board_view_update_views: null,
    calendar_view_update_views: null,
    gantt_view_update_views: null,
    deleted_by: null,
    box_view_update_views: null,
    box_view_template: null,
    box_view_settings: null,
    permissions: {
      can_read: true,
      add_email_account: true,
      billing: true,
      can_add_team_guests: true,
      can_add_team_limited_members: true,
      can_add_team_members: true,
      can_add_workspace_attachments: true,
      can_be_added_to_spaces: true,
      can_be_added_to_user_groups: true,
      can_convert_item: true,
      can_create_agents: true,
      can_create_custom_permission_level: true,
      can_create_folders: true,
      can_create_goals: true,
      can_create_lists: true,
      can_create_milestone: true,
      can_create_personal_list: true,
      can_create_portfolios: true,
      can_create_projects: true,
      can_create_spaces: true,
      can_create_workload: true,
      can_create_workspace_doc: true,
      can_delete_comments: true,
      can_delete_custom_permission_level: true,
      can_delete_no_access: true,
      can_edit_agents: true,
      can_edit_custom_permission_level: true,
      can_edit_description: true,
      can_edit_integrations: true,
      can_edit_list_statuses: true,
      can_edit_privacy: 2,
      can_edit_project_settings: 2,
      can_edit_space_settings: 2,
      can_edit_team: true,
      can_edit_team_members: true,
      can_edit_team_owner: true,
      can_edit_trial: true,
      can_edit_user_groups: true,
      can_edit_view_protection: true,
      can_enable_sso: true,
      can_export_tasks: true,
      can_gdpr_export: true,
      can_import: true,
      can_list_inaccessible_spaces: true,
      can_make_tasks_public: true,
      can_manage_public_authn: true,
      can_manage_sharing: true,
      can_pin_fields: true,
      can_recover_inaccessible_spaces: false,
      can_see_custom_permission_level: true,
      can_see_data_retention_settings: true,
      can_see_team_members: true,
      can_see_workload: true,
      can_send_login_bypass_link: true,
      can_set_approval_settings: true,
      can_set_data_retention_settings: true,
      can_use_chat: true,
      can_use_git: true,
      can_use_public_api_dev_key: true,
      can_view_agents: true,
      can_create_vibeup_app: true,
      can_view_vibeup_app: true,
      can_edit_vibeup_app: true,
      can_create_vibeup_chat: true,
      can_view_vibeup_chat: true,
      can_edit_vibeup_chat: true,
      can_view_audit_logs: true,
      can_view_lineup_of_others: true,
      can_view_baselines: true,
      can_view_reporting: true,
      can_view_team_timesheet: true,
      chat_add_members: true,
      chat_create_channel: true,
      chat_create_dm: true,
      chat_delete_channel: true,
      create_automation: true,
      create_dashboards: true,
      create_public_view: true,
      custom_roles: true,
      make_views_public: true,
      make_items_public: true,
      manage_custom_fields: true,
      manage_custom_items: true,
      manage_statuses: true,
      manage_tags: true,
      manage_template_tags: true,
      oauth_apps: true,
      profile: true,
      public_spaces_visible: true,
      send_email: true,
      share: true,
      team_permissions: true,
      convert_custom_fields: true,
      create_custom_fields: true,
      delete_custom_fields: true,
      edit_custom_fields: true,
      merge_custom_fields: true,
      move_custom_fields: true,
      can_edit_tags: true,
      can_see_time_spent: true,
      can_see_time_estimated: true,
      can_see_points_estimated: true,
      add_attachments: true,
      add_checklists: true,
      add_dependencies: true,
      add_followers: true,
      add_self_follower: true,
      add_status: true,
      add_subtasks: true,
      add_tags: true,
      archive: true,
      can_add_automation: true,
      can_add_to_lineup: true,
      can_change_subtask_columns: true,
      can_change_task_links: true,
      can_create_baseline: true,
      can_create_folders_pl: false,
      can_create_lists_pl: false,
      can_create_relationships: true,
      can_create_tasks: true,
      can_delete_baseline: true,
      can_delete_checklist_item: true,
      can_edit_baseline: true,
      can_resolve_checklist_item_if_assigned: true,
      can_set_default_permission_level: true,
      change_assignee: 2,
      change_clickapps: true,
      change_description: true,
      change_due_date: true,
      change_incoming_address: true,
      change_points_estimate: true,
      change_priority: true,
      change_recurring: true,
      change_status: true,
      change_time_estimate: true,
      change_title: true,
      chat_add_followers: true,
      chat_add_self_follower: true,
      chat_comment: true,
      chat_manage_tiles: true,
      chat_remove_followers: true,
      chat_remove_members: true,
      chat_remove_self_follower: true,
      chat_reply: true,
      comment: true,
      create_private_view: false,
      create_view: true,
      delete: true,
      delete_view: true,
      duplicate: true,
      edit_attachments: true,
      edit_checklists: true,
      edit_goal: true,
      edit_list_details: true,
      edit_view: true,
      like_comments: true,
      manage_workspace_user_profile: true,
      merge: true,
      move_goal: true,
      move_task: true,
      remove_attachments: true,
      remove_dependencies: true,
      remove_followers: true,
      remove_self_follower: true,
      remove_status: true,
      remove_tags: true,
      set_custom_field_values: true,
      template: true,
      track_time: true,
      unshare: true,
      permission_level: 5,
      team_role: 1,
      team_role_subtype: 0,
    },
    public_sharing: null,
    zoom: false,
    template_field_ids: null,
    activity_view_template: null,
    activity_view_update_views: null,
    activity_view_settings: null,
    mind_map_view_template: null,
    mind_map_view_update_views: null,
    mind_map_view_settings: null,
    timeline_view_template: null,
    timeline_view_update_views: null,
    timeline_view_settings: null,
    table_view_template: null,
    table_view_update_views: null,
    table_view_settings: null,
    workload_view_template: null,
    workload_view_update_views: null,
    workload_view_settings: null,
    points_estimate_rollup: null,
    emails_as_replies: null,
    admin_can_manage: false,
    permanent_template_id: null,
    project_prefix: null,
    custom_task_ids_start_100: null,
    custom_task_ids_start: null,
    custom_task_ids_display: null,
    emails_clickapp: true,
    time_in_status: null,
    map_view_update_views: null,
    map_view_template: null,
    date_updated: "1731460921366",
    custom_items: false,
    priority: null,
    assignee: null,
    start_date: null,
    start_date_time: false,
    status: null,
    personal_list: false,
    project_type: null,
    is_hidden: false,
    project_orderindex: 4,
    hide_project: false,
    default_category: "90163043636",
    hidden: false,
    using_gitlab: null,
    using_bitbucket: null,
    avatar: null,
    features: {
      due_dates: {
        enabled: true,
        start_date: true,
        remap_due_dates: true,
        remap_closed_due_date: false,
      },
      sprints: {
        enabled: false,
      },
      time_tracking: {
        enabled: true,
        harvest: false,
        rollup: true,
        default_to_billable: 2,
      },
      points: {
        enabled: false,
      },
      custom_items: {
        enabled: false,
      },
      priorities: {
        enabled: true,
        priorities: [
          {
            color: "#f50000",
            id: "1",
            orderindex: "1",
            priority: "urgent",
          },
          {
            color: "#f8ae00",
            id: "2",
            orderindex: "2",
            priority: "high",
          },
          {
            color: "#6fddff",
            id: "3",
            orderindex: "3",
            priority: "normal",
          },
          {
            color: "#d8d8d8",
            id: "4",
            orderindex: "4",
            priority: "low",
          },
        ],
      },
      tags: {
        enabled: true,
      },
      time_estimates: {
        enabled: true,
        rollup: true,
        per_assignee: false,
      },
      check_unresolved: {
        enabled: true,
        subtasks: null,
        checklists: null,
        comments: null,
      },
      milestones: {
        enabled: true,
      },
      custom_fields: {
        enabled: true,
      },
      remap_dependencies: {
        enabled: true,
      },
      dependency_warning: {
        enabled: true,
      },
      status_pies: {
        enabled: true,
      },
      multiple_assignees: {
        enabled: true,
      },
      emails: {
        enabled: true,
      },
      scheduler_enabled: false,
      dependency_type_enabled: false,
      dependency_enforcement: {
        enforcement_enabled: false,
        enforcement_mode: 0,
      },
      reschedule_closed_dependencies: true,
    },
    statuses: [
      {
        id: "p90162239934_vMbrXfXW",
        status: "to do",
        type: "open",
        orderindex: 0,
        color: "#87909e",
      },
      {
        id: "p90162239934_GperFvM6",
        status: "in progress",
        type: "custom",
        orderindex: 1,
        color: "#5f55ee",
      },
      {
        id: "p90162239934_Scqo6k2T",
        status: "complete",
        type: "closed",
        orderindex: 2,
        color: "#008844",
      },
    ],
    permission_level: 5,
    automation_count: 0,
    taskcount: "0",
    listViewSettings: {
      visible: {
        due_date: true,
        start_date: false,
        date_created: false,
        date_updated: true,
        priority: true,
        assignees: true,
        task_id: false,
        time_spent: false,
      },
      sorting: [],
    },
    all_statuses: [
      {
        status: "to do",
        type: "open",
        orderindex: 0,
        colors: ["#87909e"],
      },
      {
        status: "in progress",
        type: "custom",
        orderindex: 1,
        colors: ["#5f55ee"],
      },
      {
        status: "complete",
        type: "closed",
        orderindex: 2,
        colors: ["#008844"],
      },
    ],
    project_using_gitlab: null,
    project_using_bitbucket: null,
    _version_vector: {
      workspace_id: 36698333,
      object_type: "space",
      object_id: "90162239934",
      vector: [
        {
          master_id: 27,
          version: 1731460921415000,
          deleted: false,
        },
      ],
    },
  },
  {
    id: "90165702185",
    owner: {
      id: 48763417,
      username: "Peter Jaber",
      email: "peterjaberau@gmail.com",
      color: "#ea80fc",
      initials: "PJ",
      profilePicture: null,
    },
    team: {
      id: "36698333",
      owner: {
        id: 48763417,
        username: "Peter Jaber",
        email: "peterjaberau@gmail.com",
        color: "#ea80fc",
        initials: "PJ",
        profilePicture: null,
      },
      using_github: false,
      using_gitlab: null,
      using_bitbucket: null,
      name: "Peter Jaber's Workspace",
      date_created: "1649012241023",
      avatar: null,
    },
    name: "Agency Management",
    date_created: "1764118638129",
    private: false,
    multiple_assignees: true,
    slack_channel: null,
    import_id: null,
    import_uuid: null,
    importing: false,
    points: false,
    orderindex: 5,
    template: false,
    date_deleted: null,
    archived: false,
    deleted: false,
    content: null,
    color: "#7b68ee",
    due_date: null,
    due_date_time: null,
    creator: null,
    storage_used: "0",
    default_preset_view: null,
    preset_views: [1],
    list_view_settings: null,
    board_view_settings: null,
    calendar_view_settings: null,
    gantt_view_settings: null,
    avatar_source: "fas",
    avatar_value: "business-time",
    list_view_template: null,
    board_view_template: null,
    calendar_view_template: null,
    gantt_view_template: null,
    list_view_update_views: null,
    board_view_update_views: null,
    calendar_view_update_views: null,
    gantt_view_update_views: null,
    deleted_by: null,
    box_view_update_views: null,
    box_view_template: null,
    box_view_settings: null,
    permissions: {
      can_read: true,
      add_email_account: true,
      billing: true,
      can_add_team_guests: true,
      can_add_team_limited_members: true,
      can_add_team_members: true,
      can_add_workspace_attachments: true,
      can_be_added_to_spaces: true,
      can_be_added_to_user_groups: true,
      can_convert_item: true,
      can_create_agents: true,
      can_create_custom_permission_level: true,
      can_create_folders: true,
      can_create_goals: true,
      can_create_lists: true,
      can_create_milestone: true,
      can_create_personal_list: true,
      can_create_portfolios: true,
      can_create_projects: true,
      can_create_spaces: true,
      can_create_workload: true,
      can_create_workspace_doc: true,
      can_delete_comments: true,
      can_delete_custom_permission_level: true,
      can_delete_no_access: true,
      can_edit_agents: true,
      can_edit_custom_permission_level: true,
      can_edit_description: true,
      can_edit_integrations: true,
      can_edit_list_statuses: true,
      can_edit_privacy: 2,
      can_edit_project_settings: 2,
      can_edit_space_settings: 2,
      can_edit_team: true,
      can_edit_team_members: true,
      can_edit_team_owner: true,
      can_edit_trial: true,
      can_edit_user_groups: true,
      can_edit_view_protection: true,
      can_enable_sso: true,
      can_export_tasks: true,
      can_gdpr_export: true,
      can_import: true,
      can_list_inaccessible_spaces: true,
      can_make_tasks_public: true,
      can_manage_public_authn: true,
      can_manage_sharing: true,
      can_pin_fields: true,
      can_recover_inaccessible_spaces: false,
      can_see_custom_permission_level: true,
      can_see_data_retention_settings: true,
      can_see_team_members: true,
      can_see_workload: true,
      can_send_login_bypass_link: true,
      can_set_approval_settings: true,
      can_set_data_retention_settings: true,
      can_use_chat: true,
      can_use_git: true,
      can_use_public_api_dev_key: true,
      can_view_agents: true,
      can_create_vibeup_app: true,
      can_view_vibeup_app: true,
      can_edit_vibeup_app: true,
      can_create_vibeup_chat: true,
      can_view_vibeup_chat: true,
      can_edit_vibeup_chat: true,
      can_view_audit_logs: true,
      can_view_lineup_of_others: true,
      can_view_baselines: true,
      can_view_reporting: true,
      can_view_team_timesheet: true,
      chat_add_members: true,
      chat_create_channel: true,
      chat_create_dm: true,
      chat_delete_channel: true,
      create_automation: true,
      create_dashboards: true,
      create_public_view: true,
      custom_roles: true,
      make_views_public: true,
      make_items_public: true,
      manage_custom_fields: true,
      manage_custom_items: true,
      manage_statuses: true,
      manage_tags: true,
      manage_template_tags: true,
      oauth_apps: true,
      profile: true,
      public_spaces_visible: true,
      send_email: true,
      share: true,
      team_permissions: true,
      convert_custom_fields: true,
      create_custom_fields: true,
      delete_custom_fields: true,
      edit_custom_fields: true,
      merge_custom_fields: true,
      move_custom_fields: true,
      can_edit_tags: true,
      can_see_time_spent: true,
      can_see_time_estimated: true,
      can_see_points_estimated: true,
      add_attachments: true,
      add_checklists: true,
      add_dependencies: true,
      add_followers: true,
      add_self_follower: true,
      add_status: true,
      add_subtasks: true,
      add_tags: true,
      archive: true,
      can_add_automation: true,
      can_add_to_lineup: true,
      can_change_subtask_columns: true,
      can_change_task_links: true,
      can_create_baseline: true,
      can_create_folders_pl: false,
      can_create_lists_pl: false,
      can_create_relationships: true,
      can_create_tasks: true,
      can_delete_baseline: true,
      can_delete_checklist_item: true,
      can_edit_baseline: true,
      can_resolve_checklist_item_if_assigned: true,
      can_set_default_permission_level: true,
      change_assignee: 2,
      change_clickapps: true,
      change_description: true,
      change_due_date: true,
      change_incoming_address: true,
      change_points_estimate: true,
      change_priority: true,
      change_recurring: true,
      change_status: true,
      change_time_estimate: true,
      change_title: true,
      chat_add_followers: true,
      chat_add_self_follower: true,
      chat_comment: true,
      chat_manage_tiles: true,
      chat_remove_followers: true,
      chat_remove_members: true,
      chat_remove_self_follower: true,
      chat_reply: true,
      comment: true,
      create_private_view: false,
      create_view: true,
      delete: true,
      delete_view: true,
      duplicate: true,
      edit_attachments: true,
      edit_checklists: true,
      edit_goal: true,
      edit_list_details: true,
      edit_view: true,
      like_comments: true,
      manage_workspace_user_profile: true,
      merge: true,
      move_goal: true,
      move_task: true,
      remove_attachments: true,
      remove_dependencies: true,
      remove_followers: true,
      remove_self_follower: true,
      remove_status: true,
      remove_tags: true,
      set_custom_field_values: true,
      template: true,
      track_time: true,
      unshare: true,
      permission_level: 5,
      team_role: 1,
      team_role_subtype: 0,
    },
    public_sharing: null,
    zoom: null,
    template_field_ids: null,
    activity_view_template: null,
    activity_view_update_views: null,
    activity_view_settings: null,
    mind_map_view_template: null,
    mind_map_view_update_views: null,
    mind_map_view_settings: null,
    timeline_view_template: null,
    timeline_view_update_views: null,
    timeline_view_settings: null,
    table_view_template: null,
    table_view_update_views: null,
    table_view_settings: null,
    workload_view_template: null,
    workload_view_update_views: null,
    workload_view_settings: null,
    points_estimate_rollup: null,
    emails_as_replies: null,
    admin_can_manage: true,
    permanent_template_id: null,
    project_prefix: null,
    custom_task_ids_start_100: null,
    custom_task_ids_start: null,
    custom_task_ids_display: null,
    emails_clickapp: true,
    time_in_status: null,
    map_view_update_views: null,
    map_view_template: null,
    date_updated: null,
    custom_items: null,
    priority: null,
    assignee: null,
    start_date: null,
    start_date_time: null,
    status: null,
    personal_list: null,
    project_type: null,
    is_hidden: false,
    project_orderindex: 5,
    hide_project: false,
    default_category: "90167549650",
    hidden: false,
    using_gitlab: null,
    using_bitbucket: null,
    avatar: null,
    features: {
      due_dates: {
        enabled: true,
        start_date: true,
        remap_due_dates: true,
        remap_closed_due_date: false,
      },
      sprints: {
        enabled: false,
      },
      time_tracking: {
        enabled: true,
        harvest: false,
        rollup: false,
        default_to_billable: 2,
      },
      points: {
        enabled: false,
      },
      custom_items: {
        enabled: false,
      },
      priorities: {
        enabled: true,
        priorities: [
          {
            color: "#f50000",
            id: "1",
            orderindex: "1",
            priority: "urgent",
          },
          {
            color: "#f8ae00",
            id: "2",
            orderindex: "2",
            priority: "high",
          },
          {
            color: "#6fddff",
            id: "3",
            orderindex: "3",
            priority: "normal",
          },
          {
            color: "#d8d8d8",
            id: "4",
            orderindex: "4",
            priority: "low",
          },
        ],
      },
      tags: {
        enabled: true,
      },
      time_estimates: {
        enabled: true,
        rollup: false,
        per_assignee: false,
      },
      check_unresolved: {
        enabled: true,
        subtasks: null,
        checklists: null,
        comments: null,
      },
      milestones: {
        enabled: false,
      },
      custom_fields: {
        enabled: true,
      },
      dependency_warning: {
        enabled: true,
      },
      status_pies: {
        enabled: false,
      },
      multiple_assignees: {
        enabled: true,
      },
      emails: {
        enabled: true,
      },
      scheduler_enabled: false,
      dependency_type_enabled: false,
      dependency_enforcement: {
        enforcement_enabled: false,
        enforcement_mode: 0,
      },
      reschedule_closed_dependencies: true,
    },
    statuses: [
      {
        id: "p90165702185_OzKIetLo",
        status: "Open",
        type: "open",
        orderindex: 0,
        color: "#87909e",
      },
      {
        id: "p90165702185_b56Tncol",
        status: "in progress",
        type: "custom",
        orderindex: 1,
        color: "#1090e0",
      },
      {
        id: "p90165702185_ZxeTEySd",
        status: "in review",
        type: "custom",
        orderindex: 2,
        color: "#1090e0",
      },
      {
        id: "p90165702185_FFUyT11Y",
        status: "on track",
        type: "custom",
        orderindex: 3,
        color: "#008844",
      },
      {
        id: "p90165702185_cOZMnJct",
        status: "at risk",
        type: "custom",
        orderindex: 4,
        color: "#f8ae00",
      },
      {
        id: "p90165702185_bZ0KO3Xt",
        status: "off track",
        type: "custom",
        orderindex: 5,
        color: "#d33d44",
      },
      {
        id: "p90165702185_RxECfA5A",
        status: "Closed",
        type: "closed",
        orderindex: 6,
        color: "#008844",
      },
    ],
    permission_level: 5,
    automation_count: 1,
    taskcount: "0",
    listViewSettings: {
      visible: {
        due_date: true,
        start_date: false,
        date_created: false,
        date_updated: true,
        priority: true,
        assignees: true,
        task_id: false,
        time_spent: false,
      },
      sorting: [],
    },
    all_statuses: [
      {
        status: "Open",
        type: "open",
        orderindex: 0,
        colors: ["#87909e", "#656f7d"],
      },
      {
        status: "new lead",
        type: "open",
        orderindex: 1,
        colors: ["#656f7d"],
      },
      {
        status: "prospect",
        type: "open",
        orderindex: 2,
        colors: ["#b660e0"],
      },
      {
        status: "off track",
        type: "custom",
        orderindex: 3,
        colors: ["#d33d44"],
      },
      {
        status: "on hold",
        type: "custom",
        orderindex: 4,
        colors: ["#656f7d"],
      },
      {
        status: "at risk",
        type: "custom",
        orderindex: 5,
        colors: ["#e16b16", "#f8ae00"],
      },
      {
        status: "on track",
        type: "custom",
        orderindex: 6,
        colors: ["#008844", "#64c6a2"],
      },
      {
        status: "scheduled",
        type: "custom",
        orderindex: 7,
        colors: ["#1090e0"],
      },
      {
        status: "active",
        type: "custom",
        orderindex: 8,
        colors: ["#64c6a2"],
      },
      {
        status: "overdue",
        type: "custom",
        orderindex: 9,
        colors: ["#e16b16"],
      },
      {
        status: "partial payment received",
        type: "custom",
        orderindex: 10,
        colors: ["#aa8d80"],
      },
      {
        status: "unqualified - follow-up",
        type: "custom",
        orderindex: 11,
        colors: ["#e16b16"],
      },
      {
        status: "in review",
        type: "custom",
        orderindex: 12,
        colors: ["#1090e0"],
      },
      {
        status: "invoice sent",
        type: "custom",
        orderindex: 13,
        colors: ["#4466ff"],
      },
      {
        status: "engaged",
        type: "custom",
        orderindex: 14,
        colors: ["#B81BD9"],
      },
      {
        status: "blocked",
        type: "custom",
        orderindex: 15,
        colors: ["#d33d44"],
      },
      {
        status: "in progress",
        type: "custom",
        orderindex: 16,
        colors: ["#1090e0"],
      },
      {
        status: "generating invoice",
        type: "custom",
        orderindex: 17,
        colors: ["#5f55ee"],
      },
      {
        status: "attempt to engage",
        type: "custom",
        orderindex: 18,
        colors: ["#ee5e99"],
      },
      {
        status: "need approval",
        type: "custom",
        orderindex: 19,
        colors: ["#f8ae00"],
      },
      {
        status: "former client",
        type: "done",
        orderindex: 20,
        colors: ["#e16b16"],
      },
      {
        status: "lost deal",
        type: "done",
        orderindex: 21,
        colors: ["#e16b16"],
      },
      {
        status: "invoice paid",
        type: "done",
        orderindex: 22,
        colors: ["#64c6a2"],
      },
      {
        status: "unqualified - archive",
        type: "done",
        orderindex: 23,
        colors: ["#656f7d"],
      },
      {
        status: "Closed",
        type: "closed",
        orderindex: 24,
        colors: ["#008844"],
      },
      {
        status: "qualified",
        type: "closed",
        orderindex: 25,
        colors: ["#008844"],
      },
    ],
    project_using_gitlab: null,
    project_using_bitbucket: null,
    _version_vector: {
      workspace_id: 36698333,
      object_type: "space",
      object_id: "90165702185",
      vector: [
        {
          master_id: 27,
          version: 1764118726434000,
          deleted: false,
        },
      ],
    },
  },
]

const fields = {
  "fields": [
    {
      "id": "02c5961c-a750-4123-887f-6504b675d29c",
      "name": "Review Date",
      "type": "date",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118733977",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269711",
          "name": "✨ Template Guide",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "0359bf99-ed85-40e8-9933-59ec6030f660",
      "name": "Champion",
      "type": "checkbox",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118717408",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269703",
          "name": "Contacts",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "06c1d067-bcac-4653-82ca-bed636bb01d2",
      "name": "🎨 Designer/Editor",
      "type": "users",
      "type_config": {
        "single_user": false,
        "include_groups": null,
        "include_guests": false,
        "include_team_members": false
      },
      "userid": "48763417",
      "date_created": "1751717757494",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901604908991",
          "name": "AppMachine",
          "personal_list": false,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "06c770f2-9929-44ba-aa00-9b72803638a6",
      "name": "Account Tier",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "number",
            "value": 1,
            "id": "d14ee2ca-aeb4-4e72-b82d-f46c437d676c",
            "name": "1",
            "color": "#f9d900",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "number",
            "value": 2,
            "id": "5bad38aa-b097-4e02-a096-e2475446fed8",
            "name": "2",
            "color": "#AF7E2E",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "number",
            "value": 3,
            "id": "e0b2f69a-dee8-4d2f-a14e-c2bf0b336037",
            "name": "3",
            "color": "#b5bcc2",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118689934",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269687",
          "name": "Accounts",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "0796bc61-cd17-439a-a920-885766111e19",
      "name": "Discount %",
      "type": "number",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118668935",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269680",
          "name": "Deals",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "107e90da-e867-4fc7-92aa-854cc05939cf",
      "name": "⏳ Content Progress",
      "type": "automatic_progress",
      "type_config": {
        "tracking": {
          "subtasks": true,
          "checklists": true,
          "assigned_comments": true
        },
        "complete_on": 3,
        "subtask_rollup": false
      },
      "userid": "48763417",
      "date_created": "1751717757494",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901604908991",
          "name": "AppMachine",
          "personal_list": false,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "13735a38-ca31-4f41-96ab-726ef462cdeb",
      "name": "Email Category",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "Welcome",
            "id": "85475c6c-90a6-44c6-9164-068cb7ff4910",
            "name": "Welcome",
            "color": "#FF4081",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Newsletter",
            "id": "c6b5b63d-542f-47c6-84ce-18bd2643bb68",
            "name": "Newsletter",
            "color": "#FF7FAB",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Lead Nurturing",
            "id": "dcb56430-1d2a-4a62-bf57-323cd10809b6",
            "name": "Lead Nurturing",
            "color": "#EA80FC",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Promotion",
            "id": "d27bf373-1a30-4c97-a1d3-854a92a1215b",
            "name": "Promotion",
            "color": "#bf55ec",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Survey",
            "id": "e41db870-c515-436a-b938-89f88c52149a",
            "name": "Survey",
            "color": "#9b59b6",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Announcement",
            "id": "f5da6de5-f6c2-4f3a-bded-e673fc35c17d",
            "name": "Announcement",
            "color": "#3082B7",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Event Invitation",
            "id": "f1c5851d-45ff-4327-93f9-7af2db7708d3",
            "name": "Event Invitation",
            "color": "#3397dd",
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Confirmation",
            "id": "9e2e42e8-f496-4980-8d58-ea1cee682d2a",
            "name": "Confirmation",
            "color": "#81B1FF",
            "orderindex": 7,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118695498",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269693",
          "name": "Email",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "14c83b0b-15a2-4c9b-b451-95efda80a51d",
      "name": "Quality",
      "type": "emoji",
      "type_config": {
        "count": 5,
        "code_point": "2b50"
      },
      "userid": "48763417",
      "date_created": "1764118648810",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549648",
          "name": "Client Feedback",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "15383fd0-f7c8-4d31-abd2-f5268aa7b055",
      "name": "Budget",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "On Track",
            "id": "87fbe259-7eae-4b2d-a704-68db94241cf0",
            "name": "On Track",
            "color": "#2ecd6f",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "At Risk",
            "id": "a28c710b-d7b3-46b3-8059-102a19934149",
            "name": "At Risk",
            "color": "#f9d900",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Off Track",
            "id": "51a9ab1f-2cd4-429d-9757-d6931c97dea5",
            "name": "Off Track",
            "color": "#e50000",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118638711",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "projects": [
        {
          "id": "90165702185",
          "name": "Agency Management",
          "project_access": true,
          "archived": false,
          "entity": "project",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "1841c9c4-e546-4e92-bbe1-b72efd27ab85",
      "name": "Invoice Amount",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118658651",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549649",
          "name": "Billing & Invoicing",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "21d1eedc-9f7a-4ca1-a8f5-d235eab99ab4",
      "name": "Budget",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118666946",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549651",
          "name": "Small Client Projects",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "238e2c21-720e-4d8a-8607-004e696a9e94",
      "name": "Contact Name",
      "type": "short_text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118658651",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549649",
          "name": "Billing & Invoicing",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "2caf407f-7cc8-4bdd-a0df-c966a390b8c0",
      "name": "Spend",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118666946",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549651",
          "name": "Small Client Projects",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "2d50bc9e-f99e-4fe7-832c-d2706db5881f",
      "name": "Industry",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "Construction",
            "id": "7e2299a5-f628-4c07-88e4-495ba28bf848",
            "name": "Construction",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Education",
            "id": "61edde45-8e04-45d9-95a7-3e7c4f4dcf8e",
            "name": "Education",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Entertainment",
            "id": "4cd5ddcb-de60-448f-8581-4457878566c9",
            "name": "Entertainment",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Financial Services",
            "id": "9b525e90-a26c-4845-9f4b-cfa88ece65a5",
            "name": "Financial Services",
            "color": null,
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Food and Beverage",
            "id": "276e8214-1c9c-4b7e-9987-1fd4893e5b45",
            "name": "Food and Beverage",
            "color": null,
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Healthcare",
            "id": "2ee567b6-3913-4456-8940-fad96ca94e9b",
            "name": "Healthcare",
            "color": null,
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Hospitality",
            "id": "35ad0f76-9db8-4ab7-8bb7-ea4da1ccc2e1",
            "name": "Hospitality",
            "color": null,
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "IT / Technology",
            "id": "258d91f0-3f4f-413b-8273-33e8833d8648",
            "name": "IT / Technology",
            "color": null,
            "orderindex": 7,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Manufacturing",
            "id": "9a4c8746-5861-4368-acc4-f897018f03ec",
            "name": "Manufacturing",
            "color": null,
            "orderindex": 8,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Professional Services",
            "id": "c5566836-399b-4d4f-be1a-ed67b7231983",
            "name": "Professional Services",
            "color": null,
            "orderindex": 9,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Real Estate",
            "id": "576af3a8-90e9-41f0-83f4-c60a2bf968b5",
            "name": "Real Estate",
            "color": null,
            "orderindex": 10,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Retail",
            "id": "495a6e12-98f6-4184-adb6-9c2734641965",
            "name": "Retail",
            "color": null,
            "orderindex": 11,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Telecom",
            "id": "3021e1bb-83df-4140-8e50-40286c631e30",
            "name": "Telecom",
            "color": null,
            "orderindex": 12,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Transportation",
            "id": "2f041240-064c-4fdf-b322-7cb88d61de4d",
            "name": "Transportation",
            "color": null,
            "orderindex": 13,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Other",
            "id": "bc85b0df-d256-404b-8383-76896fe1af91",
            "name": "Other",
            "color": null,
            "orderindex": 14,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "2fc4eecb-bd83-4a46-ac33-b6512551da0c",
      "name": "Mockups / Inspiration",
      "type": "attachment",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "304329e4-edc0-40c7-9d65-3f47f2382348",
      "name": "Primary Marketing Goal",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Increase brand awareness",
            "id": "85bf7f12-6cee-4156-8553-12ec01f337bc",
            "name": "Increase brand awareness",
            "color": "#7C4DFF",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Boost brand engagement",
            "id": "e996c3b0-d506-466a-9fd7-f77aaaa5cead",
            "name": "Boost brand engagement",
            "color": "#0231E8",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Rank higher in search results",
            "id": "83b43ac9-f7c2-4b45-8a04-a6ae51259bdf",
            "name": "Rank higher in search results",
            "color": "#81B1FF",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Increase website traffic",
            "id": "7269f837-47c4-4db8-95fb-2af9369489a6",
            "name": "Increase website traffic",
            "color": "#3397dd",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Generate qualified leads",
            "id": "a6b919c8-5b05-4c27-9635-94323c357e99",
            "name": "Generate qualified leads",
            "color": "#3082B7",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Increase revenue",
            "id": "cbd80fbd-a38c-4ec8-ac02-e14db06b6b56",
            "name": "Increase revenue",
            "color": "#04A9F4",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Increase customer value",
            "id": "2cc2c390-3736-4ce1-9758-c3bd38108e56",
            "name": "Increase customer value",
            "color": "#02BCD4",
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Establish brand authority",
            "id": "5f9e935c-f742-4fef-965f-834442d344cb",
            "name": "Establish brand authority",
            "color": "#1bbc9c",
            "orderindex": 7,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "376ae058-90f3-4112-8cb2-044249784c40",
      "name": "Project Description",
      "type": "text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118638711",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "projects": [
        {
          "id": "90165702185",
          "name": "Agency Management",
          "project_access": true,
          "archived": false,
          "entity": "project",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "38a181fb-016b-4dae-a448-c1420b6df2a9",
      "name": "Segment",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "SMB",
            "id": "4c399ebe-06fa-4b2f-9cc0-978a8367a459",
            "name": "SMB",
            "color": "#81B1FF",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Mid",
            "id": "c0820a5f-221d-43f7-84b9-1ea76f8af2bf",
            "name": "Mid",
            "color": "#3397dd",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Enterprise",
            "id": "0a384331-d18c-463e-b0bc-645c42264cbe",
            "name": "Enterprise",
            "color": "#3082B7",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118668935",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269680",
          "name": "Deals",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "3a0c7673-b82a-4174-b077-bb740ff85d8e",
      "name": "Lead Source",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "Search",
            "id": "f24523fd-c626-4020-870a-e8edfa12afd5",
            "name": "Search",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Content",
            "id": "965e1747-52eb-4202-94b5-ace725a100d9",
            "name": "Content",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Social Media",
            "id": "31af7853-7ea4-4fa3-b5b4-2439dbe12e87",
            "name": "Social Media",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Email Marketing",
            "id": "34883213-43a2-4260-b86f-9e50ddf4912d",
            "name": "Email Marketing",
            "color": null,
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Paid Advertising",
            "id": "19af4362-a288-45d7-a711-ba8376f61ee3",
            "name": "Paid Advertising",
            "color": null,
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Event",
            "id": "f069f800-ba49-461e-b946-2dfdde108282",
            "name": "Event",
            "color": null,
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Referral",
            "id": "fa2470f1-ec93-4665-a2bf-92a9afa8155f",
            "name": "Referral",
            "color": null,
            "orderindex": 6,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118668923",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269679",
          "name": "Leads",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "3e8ed7ec-ff9b-4b46-97e2-b91aa19f5ae1",
      "name": "Scope",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "On Track",
            "id": "614a47af-391b-43b1-8cb1-b2e1ac971931",
            "name": "On Track",
            "color": "#2ecd6f",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "At Risk",
            "id": "dc252956-8aaf-43df-b481-58799f94e06e",
            "name": "At Risk",
            "color": "#f9d900",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Off Track",
            "id": "e5fb7d12-5fde-473b-89bb-97b20cf7640f",
            "name": "Off Track",
            "color": "#e50000",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118638711",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "projects": [
        {
          "id": "90165702185",
          "name": "Agency Management",
          "project_access": true,
          "archived": false,
          "entity": "project",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "48e0883e-48c5-42d0-8769-afdfe9309470",
      "name": "Launch Date",
      "type": "date",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118733977",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269711",
          "name": "✨ Template Guide",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "4e7b9d47-643a-4e24-97f2-9e6f488711ae",
      "name": "Probability %",
      "type": "number",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118668935",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269680",
          "name": "Deals",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "595da826-ac72-416e-8dd6-228e6165f05a",
      "name": "Late Fee",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118658651",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549649",
          "name": "Billing & Invoicing",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "5f54daf2-ef7a-4939-9ae1-2b87af748267",
      "name": "Guidance",
      "type": "emoji",
      "type_config": {
        "count": 5,
        "code_point": "2b50"
      },
      "userid": "48763417",
      "date_created": "1764118648810",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549648",
          "name": "Client Feedback",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "617df11c-4931-4854-95f7-786017309d80",
      "name": "Payment Method",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Cash",
            "id": "3ce9c80d-0890-4283-9f57-e8e4b916f1c3",
            "name": "Cash",
            "color": "#2ecd6f",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Check",
            "id": "e1b830fb-097d-4d60-ba4e-b1d1bcdc373c",
            "name": "Check",
            "color": "#1bbc9c",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Debit Card",
            "id": "a96b2c45-63b7-4388-903b-59ed640dec9a",
            "name": "Debit Card",
            "color": "#02BCD4",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Credit Card",
            "id": "7c66adad-c471-4f33-a7ef-eb3c225116bb",
            "name": "Credit Card",
            "color": "#04A9F4",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Online Payment",
            "id": "f60c62cf-a105-4b2f-aeaa-5e6da11ca3b6",
            "name": "Online Payment",
            "color": "#3082B7",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Mobile Payment",
            "id": "b16387b7-fdc6-4251-a6e3-257859cd0876",
            "name": "Mobile Payment",
            "color": "#3397dd",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Electronic Bank Transfer",
            "id": "8bd181c5-3b5e-4dfd-9f45-e80b1ef33d35",
            "name": "Electronic Bank Transfer",
            "color": "#81B1FF",
            "orderindex": 6,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118658651",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549649",
          "name": "Billing & Invoicing",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "685931f0-fed5-4f36-98ba-647154e9478f",
      "name": "Loves",
      "type": "text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118648810",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549648",
          "name": "Client Feedback",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "6a53e821-7794-4430-80c8-95ab21fb9a4d",
      "name": "Contact Type",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Decision Maker",
            "id": "ace90a31-4cd1-493e-be7e-9d62558baa89",
            "name": "Decision Maker",
            "color": "#fff",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Influencer",
            "id": "28d3cc1a-0247-41d5-afb5-ffd25bcc839b",
            "name": "Influencer",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "End User",
            "id": "fc13f7da-1757-4e42-b539-3d1763de2ba9",
            "name": "End User",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Legal & Compliance",
            "id": "eeee1959-732f-47a4-88c0-f627721d15da",
            "name": "Legal & Compliance",
            "color": null,
            "orderindex": 3,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118717408",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269703",
          "name": "Contacts",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "6fadad94-8855-432e-aea6-57c3d9a6ecce",
      "name": "Spend",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "7459c2ee-5169-48b7-9194-9881286c9f61",
      "name": "Deal Value",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118668935",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269680",
          "name": "Deals",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "74dc3fda-7df8-463e-8b3d-2aecf6b8a1d8",
      "name": "Email",
      "type": "email",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "783bd342-0fcf-4eb8-ba00-fca68149f684",
      "name": "Draft Date",
      "type": "date",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118733977",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269711",
          "name": "✨ Template Guide",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "7b113f49-52b6-4c01-87b2-2954d9cb0cba",
      "name": "Sales Rep",
      "type": "users",
      "type_config": {
        "single_user": false,
        "include_groups": true,
        "include_guests": false,
        "include_team_members": false
      },
      "userid": "48763417",
      "date_created": "1764118689934",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269687",
          "name": "Accounts",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "7f1ad112-b7be-43dd-8f54-9a0b511c0c8e",
      "name": "Channel",
      "type": "labels",
      "type_config": {
        "options": [
          {
            "id": "b951e8ab-43a7-4702-8776-ed7c4e6ccad6",
            "label": "Website",
            "color": "#1bbc9c",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "id": "d3597887-5aa1-4312-be64-5273eebcdafa",
            "label": "Blog",
            "color": "#2ecd6f",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "id": "e6178e4a-b747-4804-a985-ae13235a7d7a",
            "label": "Email",
            "color": "#f9d900",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "id": "7c0c5f1a-c008-4a1d-8024-9d31e8151da3",
            "label": "Google",
            "color": "#1bbc9c",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "id": "3697f9f0-8dc1-4e87-abf7-4def6114d6a5",
            "label": "Facebook",
            "color": "#0231E8",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "id": "c54ee2b2-64ca-40ce-9ed9-fdaa17e3ee4d",
            "label": "Instagram",
            "color": "#9b59b6",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "id": "c5908edd-2d89-4ef3-be1e-19ed8d5d31d2",
            "label": "Twitter",
            "color": "#81B1FF",
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "id": "316f0d50-3d44-4659-a101-f0acc18d8929",
            "label": "LinkedIn",
            "color": "#3397dd",
            "orderindex": 7,
            "workspace_id": "36698333"
          },
          {
            "id": "46e82bc1-6be1-4500-80a8-d197ff42e292",
            "label": "YouTube",
            "color": "#E65100",
            "orderindex": 8,
            "workspace_id": "36698333"
          },
          {
            "id": "2baf1ae7-3da9-4862-bfd4-4e2fa2fbede2",
            "label": "Print",
            "color": "#AF7E2E",
            "orderindex": 9,
            "workspace_id": "36698333"
          },
          {
            "id": "c2b41e8d-5548-4319-8c56-5033a7c889bd",
            "label": "TV",
            "color": "#b5bcc2",
            "orderindex": 10,
            "workspace_id": "36698333"
          },
          {
            "id": "1157742c-fb6e-4483-a5eb-3eeceb47e9ab",
            "label": "Radio",
            "color": "#667684",
            "orderindex": 11,
            "workspace_id": "36698333"
          },
          {
            "id": "0e1cd078-2d3d-463e-86e6-d9d568029615",
            "label": "Podcast",
            "color": "#3082B7",
            "orderindex": 12,
            "workspace_id": "36698333"
          },
          {
            "id": "0287723a-e161-4ff7-960a-86d3a5547cf2",
            "label": "Outdoor",
            "color": "#7C4DFF",
            "orderindex": 13,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "7f7ab0fd-6a98-4380-be1d-e4d331e3ff47",
      "name": "Link",
      "type": "url",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "7fea5d6f-212b-461f-9818-8b7dfb77e227",
      "name": "Sales Stage",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Lead Qualification",
            "id": "db7e19a4-ac5b-43dd-833e-84f5a68d4830",
            "name": "Lead Qualification",
            "color": "#667684",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "New Deal",
            "id": "6599b3ff-a2fe-45d6-bda8-fd0489dbf4d7",
            "name": "New Deal",
            "color": "#7C4DFF",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Discovery",
            "id": "4fb03a3f-a14b-4642-828f-fe4ab97da380",
            "name": "Discovery",
            "color": "#9b59b6",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Proposal",
            "id": "f725d93e-18b1-4a84-9d36-823645cb96b2",
            "name": "Proposal",
            "color": "#3082B7",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Negotiation",
            "id": "b2fe7a9d-cdb0-4fce-84c8-2eeb8c3ac972",
            "name": "Negotiation",
            "color": "#AF7E2E",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Contract Pending",
            "id": "a96da872-61b2-4bde-b91a-8df3755b755f",
            "name": "Contract Pending",
            "color": "#f9d900",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Won",
            "id": "20cecbbd-aefd-4508-b90d-293140d20d98",
            "name": "Won",
            "color": "#2ecd6f",
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Lost",
            "id": "ff498fc2-c48c-41f6-9e46-e818f20bd2fa",
            "name": "Lost",
            "color": "#E65100",
            "orderindex": 7,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "80ee1649-1d09-4f72-bf63-f792a64ea7fb",
      "name": "Phone",
      "type": "phone",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "82f0c7ca-e077-4eaf-b052-8a61f42886c8",
      "name": "Customer Segment",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "All",
            "id": "34144ff3-b15e-4dbd-9d38-a5d7bf7b2dd0",
            "name": "All",
            "color": "#0231E8",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Tier 1",
            "id": "b2d67dba-c113-4479-983f-ac11fa694a8d",
            "name": "Tier 1",
            "color": "#AF7E2E",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Tier 2",
            "id": "30644f0e-a47c-4de3-b146-756f0d8a17d7",
            "name": "Tier 2",
            "color": "#9b59b6",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Tier 3",
            "id": "651ea8e3-78d9-467a-982f-cf848497f33c",
            "name": "Tier 3",
            "color": "#3397dd",
            "orderindex": 3,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118695498",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269693",
          "name": "Email",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "856d4180-3386-469d-81ff-3d3be74e261f",
      "name": "Email",
      "type": "email",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118658651",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549649",
          "name": "Billing & Invoicing",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "8c4b50c5-a357-49d7-b186-ec927a100fc2",
      "name": "Phone",
      "type": "phone",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118658651",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549649",
          "name": "Billing & Invoicing",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "8ecfefe8-4fc1-41c2-be24-12d759a20072",
      "name": "Marketing Task Type",
      "type": "drop_down",
      "type_config": {
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Campaign",
            "id": "88b56713-4bea-4922-b1f6-15bab364853f",
            "name": "Campaign",
            "color": "#ff7800",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Promotion",
            "id": "0a094eca-238a-40b7-be72-bcf13ae1d7f6",
            "name": "Promotion",
            "color": "#02BCD4",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Website",
            "id": "d0c8c7f6-23de-4db6-9501-4055de6009e9",
            "name": "Website",
            "color": "#800000",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Blog",
            "id": "eae343e9-2660-4301-884f-7ffbed4101b1",
            "name": "Blog",
            "color": "#800000",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Social",
            "id": "3811eda0-c59e-4320-8f14-790bfa68fa7b",
            "name": "Social",
            "color": "#800000",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Email",
            "id": "a0a454a6-c02c-44d4-9b57-136ec60afd55",
            "name": "Email",
            "color": "#800000",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Creative",
            "id": "e32f1781-5889-4752-bbfa-c0c1b4412e9c",
            "name": "Creative",
            "color": "#81B1FF",
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "SEO",
            "id": "0352c94f-1e6c-45e3-a37c-ae591da4673f",
            "name": "SEO",
            "color": "#b5bcc2",
            "orderindex": 7,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Event",
            "id": "455d6a6a-fb6d-4b8d-ba35-87a82ec6e9a6",
            "name": "Event",
            "color": "#02BCD4",
            "orderindex": 8,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Asset",
            "id": "681b19bc-0d7d-4fdf-bdd7-f347a7662317",
            "name": "Asset",
            "color": "#7CDACE",
            "orderindex": 9,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "91d820eb-68aa-49b0-9e17-f556baeafe49",
      "name": "Blog Category",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Marketing",
            "id": "9f1b43ed-1bb2-4252-8223-0edcf66da459",
            "name": "Marketing",
            "color": "#3397dd",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Project Management",
            "id": "2261896b-4bc3-43fe-87b6-fe5b8609285b",
            "name": "Project Management",
            "color": "#0231E8",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Quick Tips",
            "id": "aff48ee0-356d-4337-9de0-fd83f783ffbf",
            "name": "Quick Tips",
            "color": "#7C4DFF",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Social Media",
            "id": "139fa01e-892f-4ceb-a88c-f59227ef52d7",
            "name": "Social Media",
            "color": "#bf55ec",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Customer Story",
            "id": "2ae364b5-0a43-40a3-80c7-b6065bdf5869",
            "name": "Customer Story",
            "color": "#1bbc9c",
            "orderindex": 4,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118694801",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269692",
          "name": "Blog",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "91e9fc79-a411-47ab-be13-63e2bf397166",
      "name": "Owner",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Agency",
            "id": "dce33cff-990c-4e16-becb-b69c25a5a5c2",
            "name": "Agency",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Client",
            "id": "f85af7f0-0688-46ea-92df-b419a5cf2eaf",
            "name": "Client",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Both",
            "id": "3155a93a-d4a4-4b00-8dd6-b113ce168931",
            "name": "Both",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118668719",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269678",
          "name": "Client 1 Project",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "9d99b47b-d7f6-4550-9d86-25e738e2592a",
      "name": "Positive Impact",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Yes",
            "id": "5ab61c40-7b0f-4fa1-8f28-4940d049fbb2",
            "name": "Yes",
            "color": "#2ecd6f",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "No",
            "id": "252b952a-9d2a-4b36-bb5f-c950417285cc",
            "name": "No",
            "color": "#e50000",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Unsure",
            "id": "d9f4f8fa-53dd-42c2-8ff9-10ff9a3dd625",
            "name": "Unsure",
            "color": "#b5bcc2",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118648810",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549648",
          "name": "Client Feedback",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "9eb168e5-00fa-4864-9218-40fcd069b0df",
      "name": "Creative Project Phase",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "Definition",
            "id": "27d4d219-16ff-4174-a148-e609acb6d589",
            "name": "Definition",
            "color": "#9b59b6",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Scheduling",
            "id": "5adaeda7-01ba-4577-933e-aa9f13e3ff5b",
            "name": "Scheduling",
            "color": "#7C4DFF",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Creative Production",
            "id": "74d86a97-2977-4992-96c8-5a4e22875e04",
            "name": "Creative Production",
            "color": "#0231E8",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Review & Feedback",
            "id": "b36e9b69-fc1a-4b2c-8cfc-bcf3aa657411",
            "name": "Review & Feedback",
            "color": "#04A9F4",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Approval & Launch",
            "id": "86a19f27-4b65-4256-89b0-11f46e0cf669",
            "name": "Approval & Launch",
            "color": "#02BCD4",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Closing",
            "id": "edbedde2-a4cf-4c27-9038-077687016442",
            "name": "Closing",
            "color": "#1bbc9c",
            "orderindex": 5,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118638711",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "projects": [
        {
          "id": "90165702185",
          "name": "Agency Management",
          "project_access": true,
          "archived": false,
          "entity": "project",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "9ef8f248-e13c-4317-ab59-d1ab0f9a1e6d",
      "name": "Owner",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Agency",
            "id": "c848c23b-e25f-4101-957c-0171c0ba46c8",
            "name": "Agency",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Client",
            "id": "bfcf4917-85f4-4761-8a14-ce39f9996a51",
            "name": "Client",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Both",
            "id": "fd93997a-2377-4d80-801e-78eefc88fe9a",
            "name": "Both",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118668732",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269677",
          "name": "Client 2 Project",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "a1e56030-3997-4542-b860-5e6c4cc7a230",
      "name": "Billing Cycle",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "One-time",
            "id": "734c9eb3-6cff-4688-a45a-34bd7d7239f5",
            "name": "One-time",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Monthly",
            "id": "93421ce7-3b33-42aa-aed1-6deea378bb7e",
            "name": "Monthly",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Quarterly",
            "id": "52f9e6de-b69c-422b-b5b7-095b306fd36e",
            "name": "Quarterly",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Yearly",
            "id": "74fcb303-6c32-4d75-b432-6abe6c8f565a",
            "name": "Yearly",
            "color": null,
            "orderindex": 3,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118689934",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269687",
          "name": "Accounts",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "ae796d0d-18a5-4073-964c-bda1c98a1d28",
      "name": "Overall Experience",
      "type": "emoji",
      "type_config": {
        "count": 5,
        "code_point": "2b50"
      },
      "userid": "48763417",
      "date_created": "1764118648810",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549648",
          "name": "Client Feedback",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "b057d72c-cb19-4b6b-90f3-f493eeea32e7",
      "name": "Service/Product",
      "type": "labels",
      "type_config": {
        "options": [
          {
            "id": "b3c59d19-a9a8-4374-b81c-ed668f27281e",
            "label": "Strategy Services",
            "color": "#7C4DFF",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "id": "9873c6e3-126d-40c0-a38a-4cc8049346f1",
            "label": "Measurement and Analysis",
            "color": "#9b59b6",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "id": "6eacdc43-02f1-4228-aae7-7d7fe12d18e8",
            "label": "Content Creation",
            "color": "#bf55ec",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "id": "193981f7-2852-414f-9697-ba786cdd0009",
            "label": "Communications Services",
            "color": "#EA80FC",
            "orderindex": 3,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "b275f06e-cfb3-4e29-9c94-7b49cb1ce599",
      "name": "Owner",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Agency",
            "id": "91a81aa3-cfc3-4d9d-8803-c0ceab15224e",
            "name": "Agency",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Client",
            "id": "4097ea22-66d0-4825-b97b-108d8d6eb1e7",
            "name": "Client",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Both",
            "id": "02af164a-10f4-4be8-ae6e-014f426bc16a",
            "name": "Both",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118657352",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269672",
          "name": "Phase 2: Ideation & Production",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "b42a8f5d-8eb1-474f-a1f6-c79ae416b70f",
      "name": "address",
      "type": "location",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1691243947466",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": false,
      "required_on_subtasks": false,
      "private": false,
      "pinned": false,
      "default_value": null,
      "projects": [
        {
          "id": "54779505",
          "name": "Space",
          "project_access": true,
          "archived": false,
          "entity": "project",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "b7d8381e-77a4-4e08-897a-60a8995c4aa5",
      "name": "🤳 Social Media Platform",
      "type": "labels",
      "type_config": {
        "options": [
          {
            "id": "01959341-e3d9-41ce-9f80-7c04be8c2ae1",
            "label": "👥 Facebook",
            "color": "#0231E8",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "id": "2500f0cc-5359-42ca-9eec-879e88c4b704",
            "label": "📸 Instagram",
            "color": "#FF4081",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "id": "69233cb2-f758-410b-9dd4-54fa461f340d",
            "label": "👔 LinkedIn",
            "color": "#3082B7",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "id": "6fcc18d8-d897-428a-9e22-b8caf99a8737",
            "label": "📺 Youtube",
            "color": "#e50000",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "id": "94be9851-451d-4290-ae04-e32b30d2059a",
            "label": "📌 Pinterest",
            "color": "#E65100",
            "orderindex": 4,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1751717757494",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901604908991",
          "name": "AppMachine",
          "personal_list": false,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "c0b3cb00-3876-4dd0-b0dc-12a27e71fe28",
      "name": "CRM Item Type",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Lead",
            "id": "1ca3bff8-3779-40a5-8bf4-d30182477fce",
            "name": "Lead",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Deal",
            "id": "d1a830fd-a8ad-4f3d-bffc-985a1dc3e17a",
            "name": "Deal",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Account",
            "id": "16db79e2-1538-4c73-8ca4-e3fa67e5eed2",
            "name": "Account",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Contact",
            "id": "cb52c860-217c-4e1a-bd3d-b0598cb8eea4",
            "name": "Contact",
            "color": null,
            "orderindex": 3,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "c1b9ca96-b50c-45b7-b4ed-045c45599d19",
      "name": "Drip Campaign",
      "type": "checkbox",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118668923",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269679",
          "name": "Leads",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "c3a896b8-844e-4ec1-a44b-bc85bd12d08d",
      "name": "Quarter",
      "type": "labels",
      "type_config": {
        "options": [
          {
            "id": "4e2c62fe-1919-4204-aee3-d2efe5ca91ea",
            "label": "FY23 Q1",
            "color": "#FF4081",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "id": "5a3fdc35-34a0-411c-9e8a-7e87b7edd1e7",
            "label": "FY23 Q2",
            "color": "#7C4DFF",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "id": "d319cc70-7229-4f22-97a8-d105ae86d053",
            "label": "FY23 Q3",
            "color": "#3397dd",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "id": "f722faf6-5396-43b5-8efa-08daabba205b",
            "label": "FY23 Q4",
            "color": "#1bbc9c",
            "orderindex": 3,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118733977",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269711",
          "name": "✨ Template Guide",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "c3dd75d3-cb30-4455-b1ef-a7f6d1f57fc2",
      "name": "Requester",
      "type": "users",
      "type_config": {
        "single_user": true,
        "include_groups": null,
        "include_guests": true,
        "include_team_members": true
      },
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "c40dbe70-db6e-4378-8451-1601f9e8ba78",
      "name": "OKR Type",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Objective",
            "id": "77037a51-f279-477d-b076-939e5ac8fc16",
            "name": "Objective",
            "color": "#7C4DFF",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Key Results",
            "id": "613dd465-2119-4ee1-83b6-34a30e226ac9",
            "name": "Key Results",
            "color": "#1bbc9c",
            "orderindex": 1,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118733977",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269711",
          "name": "✨ Template Guide",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "c60382c7-4676-45bf-863e-9373bb0f67e5",
      "name": "Account Manager",
      "type": "users",
      "type_config": {
        "single_user": false,
        "include_groups": true,
        "include_guests": false,
        "include_team_members": false
      },
      "userid": "48763417",
      "date_created": "1764118689934",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269687",
          "name": "Accounts",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "c974ab1c-dbfe-4604-9161-96a009a50a63",
      "name": "Social Category",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Tips",
            "id": "881078d7-9beb-4878-b801-c7106e29ceec",
            "name": "Tips",
            "color": "#2ecd6f",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "News",
            "id": "18a17cf8-47c4-4189-95b1-bc1cda5bc061",
            "name": "News",
            "color": "#04A9F4",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Announcement",
            "id": "65c7aa68-4f62-48b6-941e-130fbe21b1a2",
            "name": "Announcement",
            "color": "#f9d900",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Tutorial",
            "id": "dde942b5-b6b8-40f8-8408-295dd3579e54",
            "name": "Tutorial",
            "color": "#ff7800",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Blog",
            "id": "4194e187-26e9-4b83-b286-bb6dc7dd6755",
            "name": "Blog",
            "color": "#7C4DFF",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Rooms",
            "id": "8d75e3ee-1fa3-40d4-9d79-29b03db55577",
            "name": "Rooms",
            "color": "#04A9F4",
            "orderindex": 5,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118741901",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269715",
          "name": "Social",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "cc061ce8-343e-4beb-842e-db7cfc145111",
      "name": "PMO Item Type",
      "type": "drop_down",
      "type_config": {
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Portfolio",
            "id": "6e5bc78b-2da7-4386-b8ae-9e3c1fc7afa2",
            "name": "Portfolio",
            "color": "#7C4DFF",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Program",
            "id": "a9b423fd-9a2b-49c8-b7cd-499024aaad1a",
            "name": "Program",
            "color": "#9b59b6",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Project",
            "id": "744aa085-e9b4-45ec-8e6a-b6f781af81b7",
            "name": "Project",
            "color": "#bf55ec",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Project Team",
            "id": "6fd2e30e-0e85-4c6d-b6c9-37cfe7c8b563",
            "name": "Project Team",
            "color": "#EA80FC",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Change Request",
            "id": "528088b5-ba56-4edb-92bf-339d00fc86fe",
            "name": "Change Request",
            "color": "#f9d900",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Risk",
            "id": "f78468ad-737f-4c27-b984-b0f5673e2687",
            "name": "Risk",
            "color": "#ff7800",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Issue",
            "id": "d613c123-9b92-434e-a16b-caf024c485f6",
            "name": "Issue",
            "color": "#e50000",
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Retrospective",
            "id": "27389d88-d32a-4172-8db7-e995f07230e4",
            "name": "Retrospective",
            "color": "#0231E8",
            "orderindex": 7,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Status Report",
            "id": "45ceb33c-4851-4a37-a6ed-df97dc27d34c",
            "name": "Status Report",
            "color": "#3082B7",
            "orderindex": 8,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Milestone",
            "id": "9592ad08-62ca-4639-b9f6-3b1685c2257e",
            "name": "Milestone",
            "color": "#3397dd",
            "orderindex": 9,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Task",
            "id": "c5879b20-2db1-4cb6-a804-97b602af4a98",
            "name": "Task",
            "color": "#04A9F4",
            "orderindex": 10,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118638711",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "projects": [
        {
          "id": "90165702185",
          "name": "Agency Management",
          "project_access": true,
          "archived": false,
          "entity": "project",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "ce697876-cdfb-4616-a27c-f4d9c9a32bf9",
      "name": "Amount Paid",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118658651",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549649",
          "name": "Billing & Invoicing",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "d04b7378-e19e-4e57-a567-0fdb8499baec",
      "name": "Objective",
      "type": "short_text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "d31d0b41-e789-4b28-bb83-576d0383e11d",
      "name": "Audience Funnel",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Cold",
            "id": "1f18d792-969a-461c-af65-1c28f0612e80",
            "name": "Cold",
            "color": "#81B1FF",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Warm",
            "id": "a8070050-6934-4e4e-8ecf-a67dba5ba800",
            "name": "Warm",
            "color": "#ff7800",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Hot",
            "id": "527ff7c7-5448-45ac-a7a3-280ee4671e49",
            "name": "Hot",
            "color": "#E65100",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118733977",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269711",
          "name": "✨ Template Guide",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "d58b948c-ff50-474b-bd06-43bfa7215bf2",
      "name": "Budget",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "d68a4a5d-05f9-4453-b113-65a1738e484f",
      "name": "Job Title",
      "type": "short_text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "d9019061-143f-433f-b4f2-02c9a2e4016f",
      "name": "Budget",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118641927",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269667",
          "name": "Projects",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "db654b76-008c-48ef-a2a3-30ca84344cac",
      "name": "Contact Name",
      "type": "short_text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118666718",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549650",
          "name": "CRM",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "e72b5d2d-a59c-4603-ae5b-ff2a4adf3ddc",
      "name": "Improvements",
      "type": "text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118648810",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549648",
          "name": "Client Feedback",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "e7bf1dba-5e26-4b64-a1d8-326c4d4e0700",
      "name": "Owner",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Agency",
            "id": "f0fb944f-167f-4186-8123-a67aaaabd747",
            "name": "Agency",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Client",
            "id": "b290a126-d502-4558-b662-2126569a75c3",
            "name": "Client",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Both",
            "id": "82533a29-4191-4167-910e-95de62bbc08b",
            "name": "Both",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118649115",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269669",
          "name": "Phase 3: Review & Launch",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "ecfebbef-df63-44c7-83c5-b1e13476eeb8",
      "name": "Schedule",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "On Track",
            "id": "82229ab7-f62e-448a-bd15-5d97d11c29f3",
            "name": "On Track",
            "color": "#2ecd6f",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "At Risk",
            "id": "a956a711-526d-4ceb-9640-a689091923eb",
            "name": "At Risk",
            "color": "#f9d900",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Off Track",
            "id": "97410d3d-7c96-4b40-8cce-49909da9bb48",
            "name": "Off Track",
            "color": "#e50000",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118638711",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "projects": [
        {
          "id": "90165702185",
          "name": "Agency Management",
          "project_access": true,
          "archived": false,
          "entity": "project",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "edd24b4b-acec-4653-a5dd-32f8678fa550",
      "name": "Target Audience",
      "type": "short_text",
      "type_config": {},
      "userid": "48763417",
      "date_created": "1764118692035",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549660",
          "name": "Content",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "f1110061-883e-4e2a-8be0-ab1d4c98c7e7",
      "name": "✍ Copywriter",
      "type": "users",
      "type_config": {
        "single_user": false,
        "include_groups": null,
        "include_guests": false,
        "include_team_members": false
      },
      "userid": "48763417",
      "date_created": "1751717757494",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901604908991",
          "name": "AppMachine",
          "personal_list": false,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "f336c6e2-bdbe-403e-845c-6763cff9b795",
      "name": "WDBA",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Yes",
            "id": "76dafeed-813b-4c72-991a-5cac63e2de0f",
            "name": "Yes",
            "color": "#2ecd6f",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "No",
            "id": "b213d045-96d3-4c36-8a99-6fe00085a080",
            "name": "No",
            "color": "#e50000",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Possibly",
            "id": "b056f3b7-909d-4b31-b9ee-d60696335e07",
            "name": "Possibly",
            "color": "#f9d900",
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118648810",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "categories": [
        {
          "id": "90167549648",
          "name": "Client Feedback",
          "category_access": true,
          "archived": false,
          "entity": "category",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "f43fea98-f7ea-4a08-8206-eff7d575d762",
      "name": "Budget",
      "type": "currency",
      "type_config": {
        "default": null,
        "precision": 2,
        "currency_type": "USD"
      },
      "userid": "48763417",
      "date_created": "1764118641949",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269666",
          "name": "Incoming Closed-Won Deals",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "f84797f7-0bf3-4fd4-bd51-6a541a1fd78c",
      "name": "Owner",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Agency",
            "id": "ce502eeb-7f53-402f-b18f-d5c2e2d760c3",
            "name": "Agency",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Client",
            "id": "938f1fc3-2e83-4253-a82a-fb7c15aa9ec6",
            "name": "Client",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Both",
            "id": "8e2bc9b7-75e0-47aa-83dc-eaedc48e586f",
            "name": "Both",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118659188",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269673",
          "name": "Phase 1: Definition & Onboarding",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "f9b11367-2407-4717-aa1c-fe01cc2c8f1b",
      "name": "Owner",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "new_drop_down": true,
        "options": [
          {
            "type": "text",
            "value": "Agency",
            "id": "2fe9e1a0-fd84-4e0d-9726-00fe92ba4935",
            "name": "Agency",
            "color": null,
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Client",
            "id": "fdf66133-4f97-45ec-aa84-67c0b8c00119",
            "name": "Client",
            "color": null,
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "Both",
            "id": "27f6af18-256d-4bdc-9a05-f488aa0dfdc3",
            "name": "Both",
            "color": null,
            "orderindex": 2,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1764118661446",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901612269674",
          "name": "Phase 4: Post Launch",
          "personal_list": null,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    },
    {
      "id": "ff5ba718-03eb-4119-ae14-eaadab3990cc",
      "name": "📅 Month",
      "type": "drop_down",
      "type_config": {
        "default": 0,
        "placeholder": null,
        "options": [
          {
            "type": "text",
            "value": "🎆 January",
            "id": "3c416221-c964-4c90-8c43-facbadaa3f96",
            "name": "🎆 January",
            "color": "#FF4081",
            "orderindex": 0,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "💘 February",
            "id": "4b657811-3d1d-410d-b22b-799be663d34a",
            "name": "💘 February",
            "color": "#9b59b6",
            "orderindex": 1,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🍀 March",
            "id": "d2e3fb85-2a2a-462a-b828-164010291ae1",
            "name": "🍀 March",
            "color": "#7C4DFF",
            "orderindex": 2,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🐇 April",
            "id": "666a943b-1919-4344-8bc7-27bf881f39a4",
            "name": "🐇 April",
            "color": "#0231E8",
            "orderindex": 3,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🐝 May",
            "id": "842e726b-d7d4-46ed-85df-053b59c3600a",
            "name": "🐝 May",
            "color": "#bf55ec",
            "orderindex": 4,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "😎 June",
            "id": "be0ddc42-7401-4c8c-8958-deaeb6ff9fec",
            "name": "😎 June",
            "color": "#EA80FC",
            "orderindex": 5,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🍉 July",
            "id": "7738c2fb-e23d-4fe4-9ffd-7547f8af5a19",
            "name": "🍉 July",
            "color": "#1bbc9c",
            "orderindex": 6,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🌠 August",
            "id": "3d5072d4-5419-4111-ab99-973d5d65b3eb",
            "name": "🌠 August",
            "color": "#04A9F4",
            "orderindex": 7,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🍂 September",
            "id": "6572ffe0-684e-4f36-a893-03ac8340b625",
            "name": "🍂 September",
            "color": "#81B1FF",
            "orderindex": 8,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🎃 October",
            "id": "450d9ca1-ca46-4f06-9296-5299ef41138e",
            "name": "🎃 October",
            "color": "#7C4DFF",
            "orderindex": 9,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "🦃 November",
            "id": "40d167c9-9b8c-470a-99c2-79d60b536bed",
            "name": "🦃 November",
            "color": "#3082B7",
            "orderindex": 10,
            "workspace_id": "36698333"
          },
          {
            "type": "text",
            "value": "⛄ December",
            "id": "f6dd035b-6c8c-4b9a-8d53-13c11c3f5877",
            "name": "⛄ December",
            "color": "#2ecd6f",
            "orderindex": 11,
            "workspace_id": "36698333"
          }
        ]
      },
      "userid": "48763417",
      "date_created": "1751717757494",
      "hide_from_guests": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "required": null,
      "required_on_subtasks": null,
      "private": null,
      "pinned": false,
      "default_value": null,
      "subcategories": [
        {
          "id": "901604908991",
          "name": "AppMachine",
          "personal_list": false,
          "subcategory_access": true,
          "archived": false,
          "entity": "subcategory",
          "applied_objects": null
        }
      ]
    }
  ]
}

const settings = {
  _lastModified: "2026-01-28T09:50:01.310Z",
  integrations: {
    "Actions Amplitude": {
      versionSettings: {
        componentTypes: [],
      },
      consentSettings: {
        categories: ["C0002"],
      },
    },
    "Google Tag Manager": {
      containerId: "GTM-KPP2P6X",
      dataLayerName: "",
      environment: "",
      trackAllPages: true,
      trackCategorizedPages: true,
      trackNamedPages: true,
      versionSettings: {
        version: "2.5.1",
        componentTypes: ["browser"],
      },
      type: "browser",
      consentSettings: {
        categories: ["C0002", "C0003"],
      },
      bundlingStatus: "bundled",
    },
    Iterable: {
      trackAllPages: false,
      trackCategorizedPages: true,
      trackNamedPages: true,
      versionSettings: {
        componentTypes: ["server"],
      },
      type: "server",
    },
    "Rokt Integration": {
      versionSettings: {
        componentTypes: [],
      },
      consentSettings: {
        categories: ["C0002"],
      },
    },
    "Actions Google Analytic 4": {
      versionSettings: {
        componentTypes: [],
      },
      consentSettings: {
        categories: ["C0002"],
      },
    },
    "General Use Webhook POST (ClickUp)": {
      convertArraysToText: false,
      convertJsonObjectsToText: false,
      eventPropertiesToInclude:
        "username,country,unsubAnnouncement,unsubNewsletter,unsubProductUpdates,unsubProductivityTips,unsubPromotions,unsubReason",
      fieldMap: {
        username: "email",
        unsubAnnouncement: "unsubAnnouncement",
        unsubNewsletter: "unsubNewsletter",
        unsubPromotions: "unsubPromotions",
        unsubProductivityTips: "unsubProductivityTips",
        unsubProductUpdates: "unsubProductUpdates",
        unsubReason: "unsubReason",
        country: "country",
      },
      includeNullValues: false,
      personTraitsToInclude: "",
      segmentPersonaApiKey: "",
      segmentPersonaSpaceId: "",
      staticValues: {
        form: "Product SignUp",
        formLocation: "app.clickup.com",
      },
      webhookEndpoint: "https://services.clickup-it.com/SystemsEAPI/api/webhook/segmentoutbound",
      webhookHeaders: {
        "Content-Type": "application/json",
      },
      versionSettings: {
        componentTypes: [],
      },
    },
    Webhook: {
      versionSettings: {
        componentTypes: [],
      },
    },
    "Send Primary Intent at Signup (ClickUp)": {
      versionSettings: {
        componentTypes: [],
      },
    },
    "Segment.io": {
      apiKey: "plViNAfpbYhPPnw0NQgcdYWMJU0zLMqz",
      unbundledIntegrations: [],
      addBundledMetadata: true,
      maybeBundledConfigIds: {
        "Google Tag Manager": ["62320bc1dfa12c4a9058a818"],
        Iterable: ["623a5068205d90aeb3d99e04"],
        "General Use Webhook POST (ClickUp)": ["662029c6a46f4dadc5bbd6b7"],
      },
      versionSettings: {
        version: "4.4.7",
        componentTypes: ["browser"],
      },
      apiHost: "api.segment.io/v1",
    },
  },
  plan: {
    track: {
      __default: {
        enabled: true,
        integrations: {},
      },
      "onboarding checklist load complete": {
        enabled: true,
        integrations: {
          "Actions Amplitude": false,
        },
      },
    },
    identify: {
      __default: {
        enabled: false,
      },
      id: {
        enabled: true,
      },
      email: {
        enabled: true,
      },
      phone: {
        enabled: true,
      },
      title: {
        enabled: true,
      },
      domain: {
        enabled: true,
      },
      address: {
        enabled: true,
      },
      company: {
        enabled: true,
      },
      country: {
        enabled: true,
      },
      language: {
        enabled: true,
      },
      lastName: {
        enabled: true,
      },
      timezone: {
        enabled: true,
      },
      createdAt: {
        enabled: true,
      },
      firstName: {
        enabled: true,
      },
      seniority: {
        enabled: true,
      },
      department: {
        enabled: true,
      },
      workspaceRoles: {
        enabled: true,
      },
      workspaceMemberships: {
        enabled: true,
      },
    },
    group: {
      __default: {
        enabled: true,
      },
    },
  },
  edgeFunction: {},
  analyticsNextEnabled: true,
  middlewareSettings: {},
  enabledMiddleware: {},
  metrics: {
    sampleRate: 0.1,
    host: "api.segment.io/v1",
  },
  legacyVideoPluginsEnabled: false,
  remotePlugins: [
    {
      name: "Actions Amplitude",
      creationName: "Actions Amplitude",
      libraryName: "amplitude-pluginsDestination",
      url: "https://cdn.segment.com/next-integrations/actions/amplitude-plugins/f12a4347e1080fb88155.js",
      settings: {
        versionSettings: {
          componentTypes: [],
        },
        consentSettings: {
          categories: ["C0002"],
        },
        subscriptions: [
          {
            id: "iCAcuQvNg8o6yDr6C94jRs",
            name: "Browser Session Tracking",
            enabled: true,
            partnerAction: "sessionId",
            subscribe: 'type = "track" or type = "identify" or type = "group" or type = "page" or type = "alias"',
            mapping: {},
          },
        ],
      },
    },
  ],
  consentSettings: {
    hasUnmappedDestinations: true,
    allCategories: ["C0001", "C0002", "C0003"],
  },
  autoInstrumentationSettings: {
    disableTraffic: false,
    sampleRate: 0,
  },
}

const customItems = {
  custom_items: [
    {
      id: 1,
      name: "milestone",
      description: null,
      avatar: {
        source: null,
        value: null,
      },
      created_by: {},
      date_created: null,
      team_id: null,
    },
    {
      id: 3,
      name: "form_response",
      description: null,
      avatar: {
        source: null,
        value: null,
      },
      created_by: {},
      date_created: null,
      team_id: null,
    },
    {
      id: 4,
      name: "meeting_note",
      description: null,
      avatar: {
        source: null,
        value: null,
      },
      created_by: {},
      date_created: null,
      team_id: null,
    },
  ],
}

const rooms = {
  rooms: [
    {
      creator: "48763417",
      archived: null,
      default_view: {
        view_id: "12zy6x-2282",
        type: 9,
        standard: false,
      },
      chat_room_category: null,
      id: "12zy6x-4156",
      type: "DM",
      visibility: "PRIVATE",
      members: ["48763417"],
      followers: ["48763417"],
      parent: {
        id: "36698333",
        type: 12,
      },
      created_at: 1764110932276,
      updated_at: 1764110932276,
      latest_comment_at: 1764110932178,
      workspace_id: "36698333",
      _version_vector: {
        workspace_id: 36698333,
        object_type: "view",
        object_id: "12zy6x-4156",
        vector: [
          {
            master_id: 27,
            version: 1764110932411000,
            deleted: false,
          },
        ],
      },
    },
    {
      creator: "48763417",
      archived: false,
      default_view: {
        view_id: "12zy6x-2282",
        type: 9,
        standard: false,
      },
      chat_room_category: null,
      id: "7-36698333-8",
      name: "Peter Jaber's Workspace",
      type: "CHANNEL",
      visibility: "PUBLIC",
      members: [],
      followers: ["48763417"],
      parent: {
        id: "36698333",
        type: 7,
      },
      created_at: 1764110932277,
      updated_at: 1764110932277,
      is_canonical_channel: true,
      workspace_id: "36698333",
      _version_vector: {
        workspace_id: 36698333,
        object_type: "view",
        object_id: "7-36698333-8",
        vector: [
          {
            master_id: 27,
            version: 1764110932382000,
            deleted: false,
          },
        ],
      },
    },
    {
      creator: "48763417",
      archived: false,
      chat_room_category: null,
      id: "6-901604908991-8",
      name: "AppMachine",
      type: "CHANNEL",
      visibility: "PUBLIC",
      members: [],
      followers: ["48763417"],
      parent: {
        id: "901604908991",
        type: 6,
      },
      created_at: 1764111009795,
      updated_at: 1764111009795,
      is_canonical_channel: true,
      workspace_id: "36698333",
      _version_vector: {
        workspace_id: 36698333,
        object_type: "view",
        object_id: "6-901604908991-8",
        vector: [
          {
            master_id: 27,
            version: 1764111009920000,
            deleted: false,
          },
        ],
      },
    },
  ],
  __typename: "ChatRoomPagination",
}

const tree = {
  workspace_id: 36698333,
  projects: [
    {
      id: "54779505",
      name: "Space",
      orderindex: 1,
      categories: [
        {
          workspace_id: "36698333",
          id: "90167549660",
          name: "Content",
          orderindex: 0,
          parent_id: "54779505",
          parent_type: 4,
          color: "#3082B7",
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901612269711",
              name: "✨ Template Guide",
              orderindex: 2,
              color: "#2ecd6f",
            },
            {
              workspace_id: "36698333",
              id: "901612269709",
              name: "Incoming Requests",
              orderindex: 3,
              color: "#3082B7",
            },
            {
              workspace_id: "36698333",
              id: "901612269692",
              name: "Blog",
              orderindex: 5,
              color: "#3082B7",
            },
            {
              workspace_id: "36698333",
              id: "901612269715",
              name: "Social",
              orderindex: 6,
              color: "#3082B7",
            },
            {
              workspace_id: "36698333",
              id: "901612269708",
              name: "Website",
              orderindex: 7,
              color: "#3082B7",
            },
            {
              workspace_id: "36698333",
              id: "901612269693",
              name: "Email",
              orderindex: 8,
              color: "#3082B7",
            },
          ],
        },
      ],
    },
    {
      id: "90164883300",
      name: "Family",
      orderindex: 2,
      color: "#6e56cf",
      categories: [
        {
          workspace_id: "36698333",
          id: "90166357565",
          name: "hidden",
          orderindex: 0,
          parent_id: "90164883300",
          parent_type: 4,
          hidden: true,
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901610629922",
              name: "List",
              orderindex: 0,
            },
          ],
        },
      ],
    },
    {
      id: "90162239934",
      name: "Brainstorming",
      orderindex: 4,
      color: "#6e56cf",
      categories: [
        {
          workspace_id: "36698333",
          id: "90163043636",
          name: "hidden",
          orderindex: 0,
          parent_id: "90162239934",
          parent_type: 4,
          hidden: true,
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901604908991",
              name: "AppMachine",
              orderindex: 0,
            },
          ],
        },
      ],
    },
    {
      id: "90165702185",
      name: "Agency Management",
      orderindex: 5,
      color: "#7b68ee",
      categories: [
        {
          workspace_id: "36698333",
          id: "90167549644",
          name: "✨ Template Guide",
          orderindex: 1,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#2ecd6f",
          subcategories: [],
        },
        {
          workspace_id: "36698333",
          id: "90167549650",
          name: "CRM",
          orderindex: 2,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#9b59b6",
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901612269679",
              name: "Leads",
              orderindex: 5,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269680",
              name: "Deals",
              orderindex: 7,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269687",
              name: "Accounts",
              orderindex: 8,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269703",
              name: "Contacts",
              orderindex: 10,
              color: "#9b59b6",
            },
          ],
        },
        {
          workspace_id: "36698333",
          id: "90167549645",
          name: "Scope of Work",
          orderindex: 3,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#9b59b6",
          subcategories: [],
        },
        {
          workspace_id: "36698333",
          id: "90167549649",
          name: "Billing & Invoicing",
          orderindex: 4,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#9b59b6",
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901612269675",
              name: "Invoice Tracking",
              orderindex: 4,
              color: "#9b59b6",
            },
          ],
        },
        {
          workspace_id: "36698333",
          id: "90167549643",
          name: "PostSale Engagements",
          orderindex: 5,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#9b59b6",
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901612269666",
              name: "Incoming Closed-Won Deals",
              orderindex: 7,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269667",
              name: "Projects",
              orderindex: 9,
              color: "#9b59b6",
            },
          ],
        },
        {
          workspace_id: "36698333",
          id: "90167549646",
          name: "Large Client Project",
          orderindex: 7,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#9b59b6",
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901612269668",
              name: "Project Management",
              orderindex: 14,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269673",
              name: "Phase 1: Definition & Onboarding",
              orderindex: 17,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269672",
              name: "Phase 2: Ideation & Production",
              orderindex: 18,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269669",
              name: "Phase 3: Review & Launch",
              orderindex: 20,
              color: "#9b59b6",
            },
            {
              workspace_id: "36698333",
              id: "901612269674",
              name: "Phase 4: Post Launch",
              orderindex: 21,
              color: "#9b59b6",
            },
          ],
        },
        {
          workspace_id: "36698333",
          id: "90167549651",
          name: "Small Client Projects",
          orderindex: 8,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#9b59b6",
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901612269678",
              name: "Client 1 Project",
              orderindex: 3,
              color: "#1bbc9c",
            },
            {
              workspace_id: "36698333",
              id: "901612269677",
              name: "Client 2 Project",
              orderindex: 7,
              color: "#1bbc9c",
            },
          ],
        },
        {
          workspace_id: "36698333",
          id: "90167549648",
          name: "Client Feedback",
          orderindex: 10,
          parent_id: "90165702185",
          parent_type: 4,
          color: "#9b59b6",
          subcategories: [
            {
              workspace_id: "36698333",
              id: "901612269671",
              name: "Project Feedback",
              orderindex: 5,
              color: "#9b59b6",
            },
          ],
        },
      ],
    },
  ],
  _version_vector: {
    workspace_id: 36698333,
    object_type: "userHierarchy",
    object_id: "36698333:list",
    vector: [
      {
        master_id: 25,
        version: 1747850815676000,
        deleted: false,
      },
      {
        master_id: 27,
        version: 1768809844121000,
        deleted: false,
      },
    ],
  },
  versions: [],
  _defaults: {
    space: {
      archived: false,
      private: false,
      hidden: null,
      sprint: null,
      parent_id: null,
      parent_type: null,
      color: null,
    },
    folder: {
      archived: false,
      private: false,
      hidden: false,
      sprint: null,
      parent_id: null,
      parent_type: null,
      color: null,
    },
    list: {
      archived: false,
      private: false,
      sprint: null,
      parent_id: null,
      parent_type: null,
      color: null,
      sprint_start_date: null,
      sprint_end_date: null,
      sprint_index: null,
      avatar: null,
      custom_items_default: null,
      permission_level: 5,
    },
    view: {
      permission_level: 5,
    },
  },
  _compressed: true,
}

const views = {
  workspace_id: "36698333",
  views: [
    {
      view_id: "12zy6x-5936",
      creator: 48763417,
      name: "Team Docs",
      visibility: 1,
      default: false,
      team_id: "36698333",
      deleted: false,
      public: false,
      parent_id: "90167549660",
      view_entity_type: 14,
      sidebar_num_subcats_between: 0,
      archived: false,
      share_with_team: true,
      type: 9,
      parent_type: 5,
      orderindex: 5,
      id: "12zy6x-5936",
      permission_level: 5,
    },
    {
      view_id: "12zy6x-4496",
      creator: 48763417,
      name: "Client 2 Scope of Work Docs",
      visibility: 1,
      default: false,
      team_id: "36698333",
      deleted: false,
      public: false,
      parent_id: "90167549645",
      view_entity_type: 14,
      sidebar_num_subcats_between: 0,
      archived: false,
      share_with_team: true,
      type: 9,
      parent_type: 5,
      orderindex: 23,
      id: "12zy6x-4496",
      permission_level: 5,
    },
    {
      view_id: "12zy6x-4656",
      creator: 48763417,
      name: "Meeting Minutes",
      visibility: 1,
      default: false,
      team_id: "36698333",
      deleted: false,
      public: false,
      parent_id: "90167549646",
      view_entity_type: 14,
      sidebar_num_subcats_between: 0,
      archived: false,
      share_with_team: true,
      type: 9,
      parent_type: 5,
      orderindex: 2,
      id: "12zy6x-4656",
      permission_level: 5,
    },
    {
      view_id: "12zy6x-4476",
      creator: 48763417,
      name: "Client 1 Scope of Work Docs",
      visibility: 1,
      default: false,
      team_id: "36698333",
      deleted: false,
      public: false,
      parent_id: "90167549645",
      view_entity_type: 14,
      sidebar_num_subcats_between: 0,
      archived: false,
      share_with_team: true,
      type: 9,
      parent_type: 5,
      orderindex: 22,
      id: "12zy6x-4476",
      permission_level: 5,
    },
    {
      view_id: "12zy6x-4336",
      creator: 48763417,
      name: "Resource Management",
      visibility: 1,
      default: null,
      team_id: "36698333",
      deleted: false,
      public: false,
      parent_id: "90167549643",
      view_entity_type: 14,
      sidebar_num_subcats_between: 0,
      archived: false,
      share_with_team: true,
      type: 9,
      parent_type: 5,
      orderindex: 2,
      id: "12zy6x-4336",
      permission_level: 5,
    },
    {
      view_id: "12zy6x-4936",
      creator: 48763417,
      name: "Invoices",
      visibility: 1,
      default: false,
      team_id: "36698333",
      deleted: false,
      public: false,
      parent_id: "90167549649",
      view_entity_type: 14,
      sidebar_num_subcats_between: 0,
      archived: false,
      share_with_team: true,
      type: 9,
      parent_type: 5,
      orderindex: 1,
      id: "12zy6x-4936",
      permission_level: 5,
    },
    {
      view_id: "12zy6x-5916",
      creator: 48763417,
      name: "Meeting Minutes",
      visibility: 1,
      default: false,
      team_id: "36698333",
      deleted: false,
      public: false,
      parent_id: "90167549660",
      view_entity_type: 14,
      sidebar_num_subcats_between: 0,
      archived: false,
      share_with_team: true,
      type: 9,
      parent_type: 5,
      orderindex: 4,
      id: "12zy6x-5916",
      permission_level: 5,
    },
  ],
}

const personalListHierarchy = {
  "project": {
    "id": "90160270462",
    "owner": {
      "id": 48763417,
      "username": "Peter Jaber",
      "email": "peterjaberau@gmail.com",
      "color": "#ea80fc",
      "initials": "PJ",
      "profilePicture": null
    },
    "team": {
      "id": "36698333",
      "name": "Peter Jaber's Workspace",
      "date_created": "1649012241023",
      "using_github": false,
      "using_gitlab": null,
      "using_bitbucket": null
    },
    "name": "Personal Space",
    "date_created": "1702688678421",
    "private": false,
    "multiple_assignees": true,
    "slack_channel": null,
    "import_id": null,
    "import_uuid": null,
    "importing": null,
    "points": false,
    "orderindex": 3,
    "template": false,
    "date_deleted": null,
    "archived": false,
    "deleted": false,
    "content": "{\"ops\":[{\"insert\":\"\\n\",\"attributes\":{\"block-id\":\"block-c2541f18-7940-4871-a7bd-0b1b8cfea017\"}}]}",
    "color": null,
    "due_date": null,
    "due_date_time": false,
    "creator": 48763417,
    "storage_used": "1252882",
    "default_preset_view": 1,
    "preset_views": [
      1,
      2
    ],
    "list_view_settings": null,
    "board_view_settings": null,
    "calendar_view_settings": null,
    "gantt_view_settings": null,
    "avatar_source": null,
    "avatar_value": null,
    "list_view_template": null,
    "board_view_template": null,
    "calendar_view_template": null,
    "gantt_view_template": null,
    "list_view_update_views": null,
    "board_view_update_views": null,
    "calendar_view_update_views": null,
    "gantt_view_update_views": null,
    "deleted_by": null,
    "box_view_update_views": null,
    "box_view_template": null,
    "box_view_settings": null,
    "permissions": {
      "can_read": true,
      "add_email_account": true,
      "billing": true,
      "can_add_team_guests": true,
      "can_add_team_limited_members": true,
      "can_add_team_members": true,
      "can_add_workspace_attachments": true,
      "can_be_added_to_spaces": true,
      "can_be_added_to_user_groups": true,
      "can_convert_item": true,
      "can_create_agents": true,
      "can_create_custom_permission_level": true,
      "can_create_folders": true,
      "can_create_goals": true,
      "can_create_lists": false,
      "can_create_milestone": true,
      "can_create_personal_list": true,
      "can_create_portfolios": true,
      "can_create_projects": true,
      "can_create_spaces": true,
      "can_create_workload": true,
      "can_create_workspace_doc": true,
      "can_delete_comments": true,
      "can_delete_custom_permission_level": true,
      "can_delete_no_access": true,
      "can_edit_agents": true,
      "can_edit_custom_permission_level": true,
      "can_edit_description": true,
      "can_edit_integrations": false,
      "can_edit_list_statuses": true,
      "can_edit_privacy": 0,
      "can_edit_project_settings": 0,
      "can_edit_space_settings": 0,
      "can_edit_team": true,
      "can_edit_team_members": true,
      "can_edit_team_owner": true,
      "can_edit_trial": true,
      "can_edit_user_groups": true,
      "can_edit_view_protection": false,
      "can_enable_sso": true,
      "can_export_tasks": true,
      "can_gdpr_export": true,
      "can_import": true,
      "can_list_inaccessible_spaces": true,
      "can_make_tasks_public": true,
      "can_manage_public_authn": true,
      "can_manage_sharing": true,
      "can_pin_fields": true,
      "can_recover_inaccessible_spaces": false,
      "can_see_custom_permission_level": true,
      "can_see_data_retention_settings": true,
      "can_see_team_members": true,
      "can_see_workload": true,
      "can_send_login_bypass_link": true,
      "can_set_approval_settings": true,
      "can_set_data_retention_settings": true,
      "can_use_chat": true,
      "can_use_git": true,
      "can_use_public_api_dev_key": true,
      "can_view_agents": true,
      "can_create_vibeup_app": true,
      "can_view_vibeup_app": true,
      "can_edit_vibeup_app": true,
      "can_create_vibeup_chat": true,
      "can_view_vibeup_chat": true,
      "can_edit_vibeup_chat": true,
      "can_view_audit_logs": true,
      "can_view_lineup_of_others": true,
      "can_view_baselines": true,
      "can_view_reporting": true,
      "can_view_team_timesheet": true,
      "chat_add_members": true,
      "chat_create_channel": true,
      "chat_create_dm": true,
      "chat_delete_channel": true,
      "create_automation": true,
      "create_dashboards": true,
      "create_public_view": true,
      "custom_roles": true,
      "make_views_public": false,
      "make_items_public": true,
      "manage_custom_fields": false,
      "manage_custom_items": true,
      "manage_statuses": false,
      "manage_tags": true,
      "manage_template_tags": true,
      "oauth_apps": true,
      "profile": true,
      "public_spaces_visible": true,
      "send_email": true,
      "share": false,
      "team_permissions": true,
      "convert_custom_fields": false,
      "create_custom_fields": false,
      "delete_custom_fields": false,
      "edit_custom_fields": false,
      "merge_custom_fields": false,
      "move_custom_fields": false,
      "can_edit_tags": true,
      "can_see_time_spent": true,
      "can_see_time_estimated": true,
      "can_see_points_estimated": true,
      "add_attachments": true,
      "add_checklists": true,
      "add_dependencies": true,
      "add_followers": true,
      "add_self_follower": true,
      "add_status": true,
      "add_subtasks": true,
      "add_tags": true,
      "archive": false,
      "can_add_automation": false,
      "can_add_to_lineup": true,
      "can_change_subtask_columns": true,
      "can_change_task_links": true,
      "can_create_baseline": true,
      "can_create_folders_pl": false,
      "can_create_lists_pl": false,
      "can_create_relationships": true,
      "can_create_tasks": true,
      "can_delete_baseline": true,
      "can_delete_checklist_item": true,
      "can_edit_baseline": true,
      "can_resolve_checklist_item_if_assigned": true,
      "can_set_default_permission_level": true,
      "change_assignee": 0,
      "change_clickapps": true,
      "change_description": false,
      "change_due_date": false,
      "change_incoming_address": true,
      "change_points_estimate": true,
      "change_priority": false,
      "change_recurring": true,
      "change_status": false,
      "change_time_estimate": true,
      "change_title": false,
      "chat_add_followers": true,
      "chat_add_self_follower": true,
      "chat_comment": true,
      "chat_manage_tiles": true,
      "chat_remove_followers": true,
      "chat_remove_members": true,
      "chat_remove_self_follower": true,
      "chat_reply": true,
      "comment": true,
      "create_private_view": false,
      "create_view": false,
      "delete": false,
      "delete_view": false,
      "duplicate": false,
      "edit_attachments": true,
      "edit_checklists": true,
      "edit_goal": true,
      "edit_list_details": true,
      "edit_view": false,
      "like_comments": true,
      "manage_workspace_user_profile": true,
      "merge": true,
      "move_goal": true,
      "move_task": true,
      "remove_attachments": true,
      "remove_dependencies": true,
      "remove_followers": true,
      "remove_self_follower": true,
      "remove_status": true,
      "remove_tags": true,
      "set_custom_field_values": true,
      "template": false,
      "track_time": true,
      "unshare": true,
      "permission_level": 5,
      "team_role": 1,
      "team_role_subtype": 0
    },
    "public_sharing": null,
    "zoom": false,
    "template_field_ids": null,
    "activity_view_template": null,
    "activity_view_update_views": null,
    "activity_view_settings": null,
    "mind_map_view_template": null,
    "mind_map_view_update_views": null,
    "mind_map_view_settings": null,
    "timeline_view_template": null,
    "timeline_view_update_views": null,
    "timeline_view_settings": null,
    "table_view_template": null,
    "table_view_update_views": null,
    "table_view_settings": null,
    "workload_view_template": null,
    "workload_view_update_views": null,
    "workload_view_settings": null,
    "points_estimate_rollup": null,
    "emails_as_replies": null,
    "admin_can_manage": null,
    "permanent_template_id": null,
    "project_prefix": null,
    "custom_task_ids_start_100": null,
    "custom_task_ids_start": null,
    "custom_task_ids_display": null,
    "emails_clickapp": true,
    "time_in_status": null,
    "map_view_update_views": null,
    "map_view_template": null,
    "date_updated": "1702688678421",
    "custom_items": false,
    "priority": null,
    "assignee": null,
    "start_date": null,
    "start_date_time": false,
    "status": null,
    "personal_list": true,
    "project_type": null,
    "is_hidden": false,
    "project_orderindex": 3,
    "default_category": null,
    "hide_project": false,
    "hidden": false,
    "features": {
      "due_dates": {
        "enabled": true,
        "start_date": true,
        "remap_due_dates": false,
        "remap_closed_due_date": false
      },
      "sprints": {
        "enabled": false
      },
      "time_tracking": {
        "enabled": true,
        "harvest": false,
        "rollup": true,
        "default_to_billable": 2
      },
      "points": {
        "enabled": false
      },
      "custom_items": {
        "enabled": false
      },
      "priorities": {
        "enabled": true,
        "priorities": [
          {
            "color": "#f50000",
            "id": "1",
            "orderindex": "1",
            "priority": "urgent"
          },
          {
            "color": "#f8ae00",
            "id": "2",
            "orderindex": "2",
            "priority": "high"
          },
          {
            "color": "#6fddff",
            "id": "3",
            "orderindex": "3",
            "priority": "normal"
          },
          {
            "color": "#d8d8d8",
            "id": "4",
            "orderindex": "4",
            "priority": "low"
          }
        ]
      },
      "tags": {
        "enabled": true
      },
      "check_unresolved": {
        "enabled": true,
        "subtasks": null,
        "checklists": null,
        "comments": null
      },
      "milestones": {
        "enabled": false
      },
      "custom_fields": {
        "enabled": true
      },
      "remap_dependencies": {
        "enabled": true
      },
      "dependency_warning": {
        "enabled": true
      },
      "status_pies": {
        "enabled": false
      },
      "multiple_assignees": {
        "enabled": true
      },
      "emails": {
        "enabled": true
      },
      "scheduler_enabled": false,
      "dependency_type_enabled": false,
      "dependency_enforcement": {
        "enforcement_enabled": false,
        "enforcement_mode": 0
      },
      "reschedule_closed_dependencies": true
    },
    "permission_level": 5,
    "avatar": null,
    "group_assignees": [],
    "assignees": [],
    "members": [
      {
        "date_joined": "1702688678424",
        "permission_level": 5,
        "role": 1,
        "role_subtype": 0,
        "user": {
          "id": 48763417,
          "username": "Peter Jaber",
          "email": "peterjaberau@gmail.com",
          "color": "#ea80fc",
          "initials": "PJ",
          "profilePicture": null
        },
        "permissions": {
          "name": "can create and edit",
          "display_name": "edit",
          "permission_level": 5,
          "add_attachments": true,
          "add_checklists": true,
          "add_dependencies": true,
          "add_followers": true,
          "add_self_follower": true,
          "add_status": true,
          "add_subtasks": true,
          "add_tags": true,
          "archive": true,
          "can_add_automation": true,
          "can_add_to_lineup": true,
          "can_change_subtask_columns": true,
          "can_change_task_links": true,
          "can_convert_item": true,
          "can_create_agents": true,
          "can_create_baseline": true,
          "can_create_folders_pl": true,
          "can_create_lists_pl": true,
          "can_create_milestone": true,
          "can_create_relationships": true,
          "can_create_tasks": true,
          "can_create_workspace_doc": true,
          "can_delete_baseline": true,
          "can_delete_checklist_item": true,
          "can_edit_agents": true,
          "can_edit_baseline": true,
          "can_edit_user_groups": true,
          "can_make_tasks_public": true,
          "can_manage_sharing": true,
          "can_pin_fields": true,
          "can_read": true,
          "can_resolve_checklist_item_if_assigned": true,
          "can_set_default_permission_level": true,
          "can_view_agents": true,
          "can_create_vibeup_app": true,
          "can_view_vibeup_app": true,
          "can_edit_vibeup_app": true,
          "can_create_vibeup_chat": true,
          "can_view_vibeup_chat": true,
          "can_edit_vibeup_chat": true,
          "can_view_baselines": true,
          "change_assignee": 2,
          "change_clickapps": true,
          "change_description": true,
          "change_due_date": true,
          "change_incoming_address": true,
          "change_points_estimate": true,
          "change_priority": true,
          "change_recurring": true,
          "change_status": true,
          "change_time_estimate": true,
          "change_title": true,
          "chat_add_followers": true,
          "chat_add_self_follower": true,
          "chat_comment": true,
          "chat_create_channel": true,
          "chat_delete_channel": true,
          "chat_manage_tiles": true,
          "chat_remove_followers": true,
          "chat_remove_members": true,
          "chat_remove_self_follower": true,
          "chat_reply": true,
          "comment": true,
          "create_private_view": true,
          "create_public_view": true,
          "create_view": true,
          "delete": true,
          "delete_view": true,
          "duplicate": true,
          "edit_attachments": true,
          "edit_checklists": true,
          "edit_goal": true,
          "edit_list_details": true,
          "edit_view": true,
          "like_comments": true,
          "manage_custom_fields": true,
          "manage_workspace_user_profile": true,
          "merge": true,
          "move_goal": true,
          "move_task": true,
          "remove_attachments": true,
          "remove_dependencies": true,
          "remove_followers": true,
          "remove_self_follower": true,
          "remove_status": true,
          "remove_tags": true,
          "set_custom_field_values": true,
          "template": true,
          "track_time": true,
          "unshare": true
        },
        "removed": false
      }
    ],
    "group_members": [],
    "all_statuses": [
      {
        "status": "Open",
        "type": "open",
        "orderindex": 0,
        "colors": [
          "#87909e"
        ]
      },
      {
        "status": "to do",
        "type": "open",
        "orderindex": 1,
        "colors": [
          "#87909e"
        ]
      },
      {
        "status": "in progress",
        "type": "custom",
        "orderindex": 2,
        "colors": [
          "#5f55ee"
        ]
      },
      {
        "status": "complete",
        "type": "closed",
        "orderindex": 3,
        "colors": [
          "#008844"
        ]
      },
      {
        "status": "Closed",
        "type": "closed",
        "orderindex": 4,
        "colors": [
          "#008844"
        ]
      }
    ],
    "taskcount": "0",
    "statuses": [
      {
        "id": "p90160270462_O40lDoXs",
        "status": "Open",
        "type": "open",
        "orderindex": 0,
        "color": "#87909e"
      },
      {
        "id": "p90160270462_H42wBswX",
        "status": "Closed",
        "type": "closed",
        "orderindex": 1,
        "color": "#008844"
      }
    ],
    "listViewSettings": {
      "visible": {
        "due_date": true,
        "start_date": false,
        "date_created": false,
        "date_updated": true,
        "priority": true,
        "assignees": true,
        "task_id": false,
        "time_spent": false
      },
      "sorting": []
    },
    "automation_count": 0,
    "editor_token": "project:90160270462:65041962-48d3-4a61-ac81-271950dede50:0fe8dca0-6a6c-4a56-bbc5-6e0051e656a8"
  },
  "category": {
    "id": "90160374708",
    "name": "hidden",
    "date_updated": "1702688678512",
    "deleted": false,
    "orderindex": 0,
    "content": "{\"ops\":[{\"insert\":\"\\n\",\"attributes\":{\"block-id\":\"block-65017c59-b97e-4245-93c1-4e2e53ba7e48\"}}]}",
    "color": null,
    "due_date": null,
    "due_date_time": false,
    "archived": false,
    "project_id": "90160270462",
    "hidden": true,
    "sprint": null,
    "private": false,
    "override_statuses": false,
    "permanent_template_id": null,
    "status": null,
    "owner": 48763417,
    "creator": 48763417,
    "assignee": null,
    "priority": null,
    "start_date": null,
    "start_date_time": null,
    "parent_id": null,
    "parent_type": null,
    "category_type": null,
    "team_id": "36698333",
    "project_name": "Peter Jaber's Space",
    "default_subcategory": null,
    "_version_vector": {
      "workspace_id": 36698333,
      "object_type": "folder",
      "object_id": "90160374708",
      "vector": [
        {
          "master_id": 27,
          "version": 1702688678521000,
          "deleted": false
        }
      ]
    },
    "permissions": {
      "can_read": true,
      "add_email_account": true,
      "billing": true,
      "can_add_team_guests": true,
      "can_add_team_limited_members": true,
      "can_add_team_members": true,
      "can_add_workspace_attachments": true,
      "can_be_added_to_spaces": true,
      "can_be_added_to_user_groups": true,
      "can_convert_item": true,
      "can_create_agents": true,
      "can_create_custom_permission_level": true,
      "can_create_folders": true,
      "can_create_goals": true,
      "can_create_lists": false,
      "can_create_milestone": true,
      "can_create_personal_list": true,
      "can_create_portfolios": true,
      "can_create_projects": true,
      "can_create_spaces": true,
      "can_create_workload": true,
      "can_create_workspace_doc": true,
      "can_delete_comments": true,
      "can_delete_custom_permission_level": true,
      "can_delete_no_access": true,
      "can_edit_agents": true,
      "can_edit_custom_permission_level": true,
      "can_edit_description": true,
      "can_edit_integrations": false,
      "can_edit_list_statuses": true,
      "can_edit_privacy": 0,
      "can_edit_project_settings": 0,
      "can_edit_space_settings": 0,
      "can_edit_team": true,
      "can_edit_team_members": true,
      "can_edit_team_owner": true,
      "can_edit_trial": true,
      "can_edit_user_groups": true,
      "can_edit_view_protection": false,
      "can_enable_sso": true,
      "can_export_tasks": true,
      "can_gdpr_export": true,
      "can_import": true,
      "can_list_inaccessible_spaces": true,
      "can_make_tasks_public": true,
      "can_manage_public_authn": true,
      "can_manage_sharing": true,
      "can_pin_fields": true,
      "can_recover_inaccessible_spaces": true,
      "can_see_custom_permission_level": true,
      "can_see_data_retention_settings": true,
      "can_see_team_members": true,
      "can_see_workload": true,
      "can_send_login_bypass_link": true,
      "can_set_approval_settings": true,
      "can_set_data_retention_settings": true,
      "can_use_chat": true,
      "can_use_git": true,
      "can_use_public_api_dev_key": true,
      "can_view_agents": true,
      "can_create_vibeup_app": true,
      "can_view_vibeup_app": true,
      "can_edit_vibeup_app": true,
      "can_create_vibeup_chat": true,
      "can_view_vibeup_chat": true,
      "can_edit_vibeup_chat": true,
      "can_view_audit_logs": true,
      "can_view_lineup_of_others": true,
      "can_view_baselines": true,
      "can_view_reporting": true,
      "can_view_team_timesheet": true,
      "chat_add_members": true,
      "chat_create_channel": true,
      "chat_create_dm": true,
      "chat_delete_channel": true,
      "create_automation": true,
      "create_dashboards": true,
      "create_public_view": true,
      "custom_roles": true,
      "make_views_public": false,
      "make_items_public": true,
      "manage_custom_fields": false,
      "manage_custom_items": true,
      "manage_statuses": false,
      "manage_tags": true,
      "manage_template_tags": true,
      "oauth_apps": true,
      "profile": true,
      "public_spaces_visible": true,
      "send_email": true,
      "share": false,
      "team_permissions": true,
      "convert_custom_fields": false,
      "create_custom_fields": false,
      "delete_custom_fields": false,
      "edit_custom_fields": false,
      "merge_custom_fields": false,
      "move_custom_fields": false,
      "can_edit_tags": true,
      "can_see_time_spent": true,
      "can_see_time_estimated": true,
      "can_see_points_estimated": true,
      "add_attachments": true,
      "add_checklists": true,
      "add_dependencies": true,
      "add_followers": true,
      "add_self_follower": true,
      "add_status": true,
      "add_subtasks": true,
      "add_tags": true,
      "archive": false,
      "can_add_automation": false,
      "can_add_to_lineup": true,
      "can_change_subtask_columns": true,
      "can_change_task_links": true,
      "can_create_baseline": true,
      "can_create_folders_pl": true,
      "can_create_lists_pl": false,
      "can_create_relationships": true,
      "can_create_tasks": true,
      "can_delete_baseline": true,
      "can_delete_checklist_item": true,
      "can_edit_baseline": true,
      "can_resolve_checklist_item_if_assigned": true,
      "can_set_default_permission_level": true,
      "change_assignee": 0,
      "change_clickapps": false,
      "change_description": false,
      "change_due_date": false,
      "change_incoming_address": true,
      "change_points_estimate": true,
      "change_priority": false,
      "change_recurring": true,
      "change_status": false,
      "change_time_estimate": true,
      "change_title": false,
      "chat_add_followers": true,
      "chat_add_self_follower": true,
      "chat_comment": true,
      "chat_manage_tiles": true,
      "chat_remove_followers": true,
      "chat_remove_members": true,
      "chat_remove_self_follower": true,
      "chat_reply": true,
      "comment": true,
      "create_private_view": false,
      "create_view": false,
      "delete": false,
      "delete_view": false,
      "duplicate": false,
      "edit_attachments": true,
      "edit_checklists": true,
      "edit_goal": true,
      "edit_list_details": true,
      "edit_view": false,
      "like_comments": true,
      "manage_workspace_user_profile": true,
      "merge": true,
      "move_goal": true,
      "move_task": true,
      "remove_attachments": true,
      "remove_dependencies": true,
      "remove_followers": true,
      "remove_self_follower": true,
      "remove_status": true,
      "remove_tags": true,
      "set_custom_field_values": true,
      "template": false,
      "track_time": true,
      "unshare": true,
      "permission_level": 5,
      "team_role": 1,
      "team_role_subtype": 0
    },
    "permission_level": 5,
    "statuses": [],
    "automation_count": 0,
    "assignees": [],
    "group_assignees": [],
    "group_members": [],
    "features": {
      "due_dates": {
        "enabled": true,
        "start_date": true,
        "remap_due_dates": false,
        "remap_closed_due_date": false
      },
      "sprints": {
        "enabled": false
      },
      "time_tracking": {
        "enabled": true,
        "harvest": false,
        "rollup": true
      },
      "points": {
        "enabled": false
      },
      "custom_items": {
        "enabled": false
      },
      "priorities": {
        "enabled": true,
        "priorities": [
          {
            "color": "#f50000",
            "id": "1",
            "orderindex": "1",
            "priority": "urgent"
          },
          {
            "color": "#f8ae00",
            "id": "2",
            "orderindex": "2",
            "priority": "high"
          },
          {
            "color": "#6fddff",
            "id": "3",
            "orderindex": "3",
            "priority": "normal"
          },
          {
            "color": "#d8d8d8",
            "id": "4",
            "orderindex": "4",
            "priority": "low"
          }
        ]
      },
      "tags": {
        "enabled": true
      },
      "check_unresolved": {
        "enabled": true,
        "subtasks": null,
        "checklists": null,
        "comments": null
      },
      "milestones": {
        "enabled": false
      },
      "custom_fields": {
        "enabled": true
      },
      "remap_dependencies": {
        "enabled": true
      },
      "dependency_warning": {
        "enabled": true
      },
      "status_pies": {
        "enabled": false
      },
      "multiple_assignees": {
        "enabled": true
      },
      "emails": {
        "enabled": true
      }
    },
    "members": [],
    "project_access": true,
    "project": {
      "id": "90160270462",
      "name": "Peter Jaber's Space",
      "access": true
    },
    "subcategories": [
      {
        "id": "901600616978",
        "name": "Personal List",
        "orderindex": 0,
        "content": "{\"ops\":[{\"insert\":\"\\n\",\"attributes\":{\"block-id\":\"block-baa2e662-1a80-4f93-9f18-bf287a0eda77\"}}]}",
        "color": null,
        "due_date": null,
        "due_date_time": false,
        "start_date": null,
        "start_date_time": null,
        "hide_description": false,
        "archived": false,
        "category": "90160374708",
        "encrypted": false,
        "private": true,
        "priority": null,
        "status": null,
        "assignee": null,
        "sprint": null,
        "sprint_index": null,
        "sprint_status": null,
        "sprint_start_date": null,
        "sprint_end_date": null,
        "sprint_date_done": null,
        "sprint_date_progress": null,
        "sprint_dashboard_id": null,
        "override_statuses": true,
        "date_created": "1702688678563",
        "custom_items_default": null,
        "import_uuid": null,
        "avatar": null,
        "subcategory_type": null,
        "owner": 48763417,
        "project_id": "90160270462",
        "sprint_date_format": null,
        "personal_list": true,
        "can_see_time_spent": true,
        "can_see_time_estimated": true,
        "can_see_points_estimated": true,
        "assignees": [],
        "group_assignees": [],
        "automation_count": 0,
        "points_total": null,
        "features": {
          "due_dates": {
            "enabled": true,
            "start_date": true,
            "remap_due_dates": false,
            "remap_closed_due_date": false
          },
          "sprints": {
            "enabled": false
          },
          "time_tracking": {
            "enabled": true,
            "harvest": false,
            "rollup": true
          },
          "points": {
            "enabled": false
          },
          "custom_items": {
            "enabled": false
          },
          "priorities": {
            "enabled": true,
            "priorities": [
              {
                "color": "#f50000",
                "id": "1",
                "orderindex": "1",
                "priority": "urgent"
              },
              {
                "color": "#f8ae00",
                "id": "2",
                "orderindex": "2",
                "priority": "high"
              },
              {
                "color": "#6fddff",
                "id": "3",
                "orderindex": "3",
                "priority": "normal"
              },
              {
                "color": "#d8d8d8",
                "id": "4",
                "orderindex": "4",
                "priority": "low"
              }
            ]
          },
          "tags": {
            "enabled": true
          },
          "check_unresolved": {
            "enabled": true,
            "subtasks": null,
            "checklists": null,
            "comments": null
          },
          "milestones": {
            "enabled": false
          },
          "custom_fields": {
            "enabled": true
          },
          "remap_dependencies": {
            "enabled": true
          },
          "dependency_warning": {
            "enabled": true
          },
          "status_pies": {
            "enabled": false
          },
          "multiple_assignees": {
            "enabled": true
          },
          "emails": {
            "enabled": true
          }
        },
        "hasAttachments": false,
        "members": [
          {
            "user": {
              "id": 48763417,
              "username": "Peter Jaber",
              "email": "peterjaberau@gmail.com",
              "color": "#ea80fc",
              "initials": "PJ",
              "profilePicture": null
            },
            "permissions": {
              "name": "can create and edit",
              "display_name": "edit",
              "permission_level": 5,
              "add_attachments": true,
              "add_checklists": true,
              "add_dependencies": true,
              "add_followers": true,
              "add_self_follower": true,
              "add_status": true,
              "add_subtasks": true,
              "add_tags": true,
              "archive": true,
              "can_add_automation": true,
              "can_add_to_lineup": true,
              "can_change_subtask_columns": true,
              "can_change_task_links": true,
              "can_convert_item": true,
              "can_create_agents": true,
              "can_create_baseline": true,
              "can_create_folders_pl": true,
              "can_create_lists_pl": true,
              "can_create_milestone": true,
              "can_create_relationships": true,
              "can_create_tasks": true,
              "can_create_workspace_doc": true,
              "can_delete_baseline": true,
              "can_delete_checklist_item": true,
              "can_edit_agents": true,
              "can_edit_baseline": true,
              "can_edit_user_groups": true,
              "can_make_tasks_public": true,
              "can_manage_sharing": true,
              "can_pin_fields": true,
              "can_read": true,
              "can_resolve_checklist_item_if_assigned": true,
              "can_set_default_permission_level": true,
              "can_view_agents": true,
              "can_create_vibeup_app": true,
              "can_view_vibeup_app": true,
              "can_edit_vibeup_app": true,
              "can_create_vibeup_chat": true,
              "can_view_vibeup_chat": true,
              "can_edit_vibeup_chat": true,
              "can_view_baselines": true,
              "change_assignee": 2,
              "change_clickapps": true,
              "change_description": true,
              "change_due_date": true,
              "change_incoming_address": true,
              "change_points_estimate": true,
              "change_priority": true,
              "change_recurring": true,
              "change_status": true,
              "change_time_estimate": true,
              "change_title": true,
              "chat_add_followers": true,
              "chat_add_self_follower": true,
              "chat_comment": true,
              "chat_create_channel": true,
              "chat_delete_channel": true,
              "chat_manage_tiles": true,
              "chat_remove_followers": true,
              "chat_remove_members": true,
              "chat_remove_self_follower": true,
              "chat_reply": true,
              "comment": true,
              "create_private_view": true,
              "create_public_view": true,
              "create_view": true,
              "delete": true,
              "delete_view": true,
              "duplicate": true,
              "edit_attachments": true,
              "edit_checklists": true,
              "edit_goal": true,
              "edit_list_details": true,
              "edit_view": true,
              "like_comments": true,
              "manage_custom_fields": true,
              "manage_workspace_user_profile": true,
              "merge": true,
              "move_goal": true,
              "move_task": true,
              "remove_attachments": true,
              "remove_dependencies": true,
              "remove_followers": true,
              "remove_self_follower": true,
              "remove_status": true,
              "remove_tags": true,
              "set_custom_field_values": true,
              "template": true,
              "track_time": true,
              "unshare": true
            },
            "permission_level": 5,
            "date_added": "1702688678572",
            "role": 1,
            "role_subtype": 0,
            "role_key": "owner"
          }
        ],
        "group_members": [],
        "permissions": {
          "can_read": true,
          "add_email_account": true,
          "billing": true,
          "can_add_team_guests": true,
          "can_add_team_limited_members": true,
          "can_add_team_members": true,
          "can_add_workspace_attachments": true,
          "can_be_added_to_spaces": true,
          "can_be_added_to_user_groups": true,
          "can_convert_item": true,
          "can_create_agents": true,
          "can_create_custom_permission_level": true,
          "can_create_folders": true,
          "can_create_goals": true,
          "can_create_lists": false,
          "can_create_milestone": true,
          "can_create_personal_list": true,
          "can_create_portfolios": true,
          "can_create_projects": true,
          "can_create_spaces": true,
          "can_create_workload": true,
          "can_create_workspace_doc": true,
          "can_delete_comments": true,
          "can_delete_custom_permission_level": true,
          "can_delete_no_access": true,
          "can_edit_agents": true,
          "can_edit_custom_permission_level": true,
          "can_edit_description": true,
          "can_edit_integrations": false,
          "can_edit_list_statuses": true,
          "can_edit_privacy": 0,
          "can_edit_project_settings": 0,
          "can_edit_space_settings": 0,
          "can_edit_team": true,
          "can_edit_team_members": true,
          "can_edit_team_owner": true,
          "can_edit_trial": true,
          "can_edit_user_groups": true,
          "can_edit_view_protection": true,
          "can_enable_sso": true,
          "can_export_tasks": true,
          "can_gdpr_export": true,
          "can_import": true,
          "can_list_inaccessible_spaces": true,
          "can_make_tasks_public": true,
          "can_manage_public_authn": true,
          "can_manage_sharing": true,
          "can_pin_fields": true,
          "can_recover_inaccessible_spaces": true,
          "can_see_custom_permission_level": true,
          "can_see_data_retention_settings": true,
          "can_see_team_members": true,
          "can_see_workload": true,
          "can_send_login_bypass_link": true,
          "can_set_approval_settings": true,
          "can_set_data_retention_settings": true,
          "can_use_chat": true,
          "can_use_git": true,
          "can_use_public_api_dev_key": true,
          "can_view_agents": true,
          "can_create_vibeup_app": true,
          "can_view_vibeup_app": true,
          "can_edit_vibeup_app": true,
          "can_create_vibeup_chat": true,
          "can_view_vibeup_chat": true,
          "can_edit_vibeup_chat": true,
          "can_view_audit_logs": true,
          "can_view_lineup_of_others": true,
          "can_view_baselines": true,
          "can_view_reporting": true,
          "can_view_team_timesheet": true,
          "chat_add_members": true,
          "chat_create_channel": true,
          "chat_create_dm": true,
          "chat_delete_channel": true,
          "create_automation": true,
          "create_dashboards": true,
          "create_public_view": true,
          "custom_roles": true,
          "make_views_public": false,
          "make_items_public": true,
          "manage_custom_fields": true,
          "manage_custom_items": true,
          "manage_statuses": true,
          "manage_tags": true,
          "manage_template_tags": true,
          "oauth_apps": true,
          "profile": true,
          "public_spaces_visible": true,
          "send_email": true,
          "share": true,
          "team_permissions": true,
          "convert_custom_fields": false,
          "create_custom_fields": true,
          "delete_custom_fields": true,
          "edit_custom_fields": true,
          "merge_custom_fields": false,
          "move_custom_fields": true,
          "can_edit_tags": true,
          "can_see_time_spent": true,
          "can_see_time_estimated": true,
          "can_see_points_estimated": true,
          "add_attachments": true,
          "add_checklists": true,
          "add_dependencies": true,
          "add_followers": true,
          "add_self_follower": true,
          "add_status": true,
          "add_subtasks": true,
          "add_tags": true,
          "archive": false,
          "can_add_automation": true,
          "can_add_to_lineup": true,
          "can_change_subtask_columns": true,
          "can_change_task_links": true,
          "can_create_baseline": true,
          "can_create_folders_pl": true,
          "can_create_lists_pl": false,
          "can_create_relationships": true,
          "can_create_tasks": true,
          "can_delete_baseline": true,
          "can_delete_checklist_item": true,
          "can_edit_baseline": true,
          "can_resolve_checklist_item_if_assigned": true,
          "can_set_default_permission_level": true,
          "change_assignee": 2,
          "change_clickapps": false,
          "change_description": true,
          "change_due_date": true,
          "change_incoming_address": true,
          "change_points_estimate": true,
          "change_priority": false,
          "change_recurring": true,
          "change_status": true,
          "change_time_estimate": true,
          "change_title": false,
          "chat_add_followers": true,
          "chat_add_self_follower": true,
          "chat_comment": true,
          "chat_manage_tiles": true,
          "chat_remove_followers": true,
          "chat_remove_members": true,
          "chat_remove_self_follower": true,
          "chat_reply": true,
          "comment": true,
          "create_private_view": false,
          "create_view": true,
          "delete": true,
          "delete_view": true,
          "duplicate": false,
          "edit_attachments": true,
          "edit_checklists": true,
          "edit_goal": true,
          "edit_list_details": true,
          "edit_view": true,
          "like_comments": true,
          "manage_workspace_user_profile": true,
          "merge": true,
          "move_goal": true,
          "move_task": true,
          "remove_attachments": true,
          "remove_dependencies": true,
          "remove_followers": true,
          "remove_self_follower": true,
          "remove_status": true,
          "remove_tags": true,
          "set_custom_field_values": true,
          "template": false,
          "track_time": true,
          "unshare": true,
          "permission_level": 5,
          "team_role": 1,
          "team_role_subtype": 0
        },
        "permission_level": 5,
        "time_spent": 0,
        "time_estimate": 0,
        "taskcount": 0,
        "unfinishedtaskcount": 0,
        "closedtaskcount": 0,
        "statuses": [
          {
            "id": "s901600616978_ouuZIued",
            "status": "to do",
            "orderindex": 0,
            "color": "#87909e",
            "type": "open",
            "status_group": "subcat_901600616978"
          },
          {
            "id": "s901600616978_hhsYxldb",
            "status": "in progress",
            "orderindex": 1,
            "color": "#5f55ee",
            "type": "custom",
            "status_group": "subcat_901600616978"
          },
          {
            "id": "s901600616978_bVjmQFie",
            "status": "complete",
            "orderindex": 2,
            "color": "#008844",
            "type": "closed",
            "status_group": "subcat_901600616978"
          }
        ],
        "incoming_address": "a.t.901600616978.u-48763417.f4ae43e4-93fd-469b-b977-199c5f2aaf28@tasks.clickup.com",
        "content_size": "none"
      }
    ],
    "taskcount": "0",
    "editor_token": "category:90160374708:9a80d01c-e70b-462e-ac31-b7be65cabe27:5efefb0e-2e30-4674-bf09-aebb7d1b776e"
  },
  "subcategory": {
    "id": "901600616978",
    "name": "Personal List",
    "personal_list": true,
    "orderindex": 0,
    "content": "{\"ops\":[{\"insert\":\"\\n\",\"attributes\":{\"block-id\":\"block-baa2e662-1a80-4f93-9f18-bf287a0eda77\"}}]}",
    "color": null,
    "status_name": null,
    "avatar": null,
    "custom_items_default": null,
    "due_date": null,
    "date_updated": "1702688678563",
    "due_date_time": false,
    "start_date": null,
    "start_date_time": null,
    "archived": false,
    "hide_description": false,
    "deleted": false,
    "category": "90160374708",
    "encrypted": false,
    "private": true,
    "owner": 48763417,
    "assignee": null,
    "priority": null,
    "override_statuses": true,
    "email_token": null,
    "editor_token": "subcategory:901600616978:7b6e7b33-bfe4-4461-a8d0-486d7d9aecd0:b99393cb-de1b-4eb5-bd2d-4d0a53b69520",
    "sprint": null,
    "sprint_index": null,
    "sprint_status": null,
    "sprint_start_date": null,
    "sprint_end_date": null,
    "sprint_date_done": null,
    "sprint_date_progress": null,
    "sprint_dashboard_id": null,
    "subcategory_type": null,
    "project_id": "90160270462",
    "category_hidden": true,
    "project_name": "Personal Space",
    "sprint_date_format": null,
    "estimation": null,
    "_version_vector": {
      "workspace_id": 36698333,
      "object_type": "list",
      "object_id": "901600616978",
      "vector": [
        {
          "master_id": 27,
          "version": 1702688678581000,
          "deleted": false
        }
      ]
    },
    "category_details": {
      "id": "90160374708",
      "name": "hidden",
      "hidden": true,
      "access": true
    },
    "category_access": true,
    "project_details": {
      "id": "90160270462",
      "name": "Peter Jaber's Space",
      "access": true
    },
    "project_access": true,
    "owner_obj": {
      "userid": 48763417,
      "color": "#ea80fc",
      "profilePicture": null,
      "initials": "PJ",
      "email": "peterjaberau@gmail.com",
      "username": "Peter Jaber"
    },
    "content_size": "none",
    "permissions": {
      "can_read": true,
      "add_email_account": true,
      "billing": true,
      "can_add_team_guests": true,
      "can_add_team_limited_members": true,
      "can_add_team_members": true,
      "can_add_workspace_attachments": true,
      "can_be_added_to_spaces": true,
      "can_be_added_to_user_groups": true,
      "can_convert_item": true,
      "can_create_agents": true,
      "can_create_custom_permission_level": true,
      "can_create_folders": true,
      "can_create_goals": true,
      "can_create_lists": false,
      "can_create_milestone": true,
      "can_create_personal_list": true,
      "can_create_portfolios": true,
      "can_create_projects": true,
      "can_create_spaces": true,
      "can_create_workload": true,
      "can_create_workspace_doc": true,
      "can_delete_comments": true,
      "can_delete_custom_permission_level": true,
      "can_delete_no_access": true,
      "can_edit_agents": true,
      "can_edit_custom_permission_level": true,
      "can_edit_description": true,
      "can_edit_integrations": false,
      "can_edit_list_statuses": true,
      "can_edit_privacy": 0,
      "can_edit_project_settings": 0,
      "can_edit_space_settings": 0,
      "can_edit_team": true,
      "can_edit_team_members": true,
      "can_edit_team_owner": true,
      "can_edit_trial": true,
      "can_edit_user_groups": true,
      "can_edit_view_protection": true,
      "can_enable_sso": true,
      "can_export_tasks": true,
      "can_gdpr_export": true,
      "can_import": true,
      "can_list_inaccessible_spaces": true,
      "can_make_tasks_public": true,
      "can_manage_public_authn": true,
      "can_manage_sharing": true,
      "can_pin_fields": true,
      "can_recover_inaccessible_spaces": true,
      "can_see_custom_permission_level": true,
      "can_see_data_retention_settings": true,
      "can_see_team_members": true,
      "can_see_workload": true,
      "can_send_login_bypass_link": true,
      "can_set_approval_settings": true,
      "can_set_data_retention_settings": true,
      "can_use_chat": true,
      "can_use_git": true,
      "can_use_public_api_dev_key": true,
      "can_view_agents": true,
      "can_create_vibeup_app": true,
      "can_view_vibeup_app": true,
      "can_edit_vibeup_app": true,
      "can_create_vibeup_chat": true,
      "can_view_vibeup_chat": true,
      "can_edit_vibeup_chat": true,
      "can_view_audit_logs": true,
      "can_view_lineup_of_others": true,
      "can_view_baselines": true,
      "can_view_reporting": true,
      "can_view_team_timesheet": true,
      "chat_add_members": true,
      "chat_create_channel": true,
      "chat_create_dm": true,
      "chat_delete_channel": true,
      "create_automation": true,
      "create_dashboards": true,
      "create_public_view": true,
      "custom_roles": true,
      "make_views_public": false,
      "make_items_public": true,
      "manage_custom_fields": true,
      "manage_custom_items": true,
      "manage_statuses": true,
      "manage_tags": true,
      "manage_template_tags": true,
      "oauth_apps": true,
      "profile": true,
      "public_spaces_visible": true,
      "send_email": true,
      "share": true,
      "team_permissions": true,
      "convert_custom_fields": false,
      "create_custom_fields": true,
      "delete_custom_fields": true,
      "edit_custom_fields": true,
      "merge_custom_fields": false,
      "move_custom_fields": true,
      "can_edit_tags": true,
      "can_see_time_spent": true,
      "can_see_time_estimated": true,
      "can_see_points_estimated": true,
      "add_attachments": true,
      "add_checklists": true,
      "add_dependencies": true,
      "add_followers": true,
      "add_self_follower": true,
      "add_status": true,
      "add_subtasks": true,
      "add_tags": true,
      "archive": false,
      "can_add_automation": true,
      "can_add_to_lineup": true,
      "can_change_subtask_columns": true,
      "can_change_task_links": true,
      "can_create_baseline": true,
      "can_create_folders_pl": true,
      "can_create_lists_pl": false,
      "can_create_relationships": true,
      "can_create_tasks": true,
      "can_delete_baseline": true,
      "can_delete_checklist_item": true,
      "can_edit_baseline": true,
      "can_resolve_checklist_item_if_assigned": true,
      "can_set_default_permission_level": true,
      "change_assignee": 2,
      "change_clickapps": false,
      "change_description": true,
      "change_due_date": true,
      "change_incoming_address": true,
      "change_points_estimate": true,
      "change_priority": false,
      "change_recurring": true,
      "change_status": true,
      "change_time_estimate": true,
      "change_title": false,
      "chat_add_followers": true,
      "chat_add_self_follower": true,
      "chat_comment": true,
      "chat_manage_tiles": true,
      "chat_remove_followers": true,
      "chat_remove_members": true,
      "chat_remove_self_follower": true,
      "chat_reply": true,
      "comment": true,
      "create_private_view": false,
      "create_view": true,
      "delete": true,
      "delete_view": true,
      "duplicate": false,
      "edit_attachments": true,
      "edit_checklists": true,
      "edit_goal": true,
      "edit_list_details": true,
      "edit_view": true,
      "like_comments": true,
      "manage_workspace_user_profile": true,
      "merge": true,
      "move_goal": true,
      "move_task": true,
      "remove_attachments": true,
      "remove_dependencies": true,
      "remove_followers": true,
      "remove_self_follower": true,
      "remove_status": true,
      "remove_tags": true,
      "set_custom_field_values": true,
      "template": false,
      "track_time": true,
      "unshare": true,
      "permission_level": 5,
      "team_role": 1,
      "team_role_subtype": 0
    },
    "permission_level": 5,
    "team_id": "36698333",
    "automation_count": 0,
    "hasAttachments": false,
    "assignees": [],
    "group_assignees": [],
    "features": {
      "due_dates": {
        "enabled": true,
        "start_date": true,
        "remap_due_dates": false,
        "remap_closed_due_date": false
      },
      "sprints": {
        "enabled": false
      },
      "time_tracking": {
        "enabled": true,
        "harvest": false,
        "rollup": true
      },
      "points": {
        "enabled": false
      },
      "custom_items": {
        "enabled": false
      },
      "priorities": {
        "enabled": true,
        "priorities": [
          {
            "color": "#f50000",
            "id": "1",
            "orderindex": "1",
            "priority": "urgent"
          },
          {
            "color": "#f8ae00",
            "id": "2",
            "orderindex": "2",
            "priority": "high"
          },
          {
            "color": "#6fddff",
            "id": "3",
            "orderindex": "3",
            "priority": "normal"
          },
          {
            "color": "#d8d8d8",
            "id": "4",
            "orderindex": "4",
            "priority": "low"
          }
        ]
      },
      "tags": {
        "enabled": true
      },
      "check_unresolved": {
        "enabled": true,
        "subtasks": null,
        "checklists": null,
        "comments": null
      },
      "milestones": {
        "enabled": false
      },
      "custom_fields": {
        "enabled": true
      },
      "remap_dependencies": {
        "enabled": true
      },
      "dependency_warning": {
        "enabled": true
      },
      "status_pies": {
        "enabled": false
      },
      "multiple_assignees": {
        "enabled": true
      },
      "emails": {
        "enabled": true
      }
    },
    "group_members": [],
    "followers": [
      {
        "id": 48763417,
        "username": "Peter Jaber",
        "email": "peterjaberau@gmail.com",
        "color": "#ea80fc",
        "initials": "PJ",
        "profilePicture": null
      }
    ],
    "inbound_address": "a.t.901600616978.u-48763417.f4ae43e4-93fd-469b-b977-199c5f2aaf28@tasks.clickup.com",
    "taskCount": 0,
    "taskcount": 0,
    "unfinishedtaskcount": 0,
    "closedtaskcount": 0,
    "statuses": [
      {
        "id": "s901600616978_ouuZIued",
        "status": "to do",
        "orderindex": 0,
        "color": "#87909e",
        "type": "open",
        "status_group": "subcat_901600616978"
      },
      {
        "id": "s901600616978_hhsYxldb",
        "status": "in progress",
        "orderindex": 1,
        "color": "#5f55ee",
        "type": "custom",
        "status_group": "subcat_901600616978"
      },
      {
        "id": "s901600616978_bVjmQFie",
        "status": "complete",
        "orderindex": 2,
        "color": "#008844",
        "type": "closed",
        "status_group": "subcat_901600616978"
      }
    ],
    "time_estimate": "0",
    "members": [
      {
        "user": {
          "id": 48763417,
          "username": "Peter Jaber",
          "email": "peterjaberau@gmail.com",
          "color": "#ea80fc",
          "initials": "PJ",
          "profilePicture": null
        },
        "permissions": {
          "name": "can create and edit",
          "display_name": "edit",
          "permission_level": 5,
          "add_attachments": true,
          "add_checklists": true,
          "add_dependencies": true,
          "add_followers": true,
          "add_self_follower": true,
          "add_status": true,
          "add_subtasks": true,
          "add_tags": true,
          "archive": true,
          "can_add_automation": true,
          "can_add_to_lineup": true,
          "can_change_subtask_columns": true,
          "can_change_task_links": true,
          "can_convert_item": true,
          "can_create_agents": true,
          "can_create_baseline": true,
          "can_create_folders_pl": true,
          "can_create_lists_pl": true,
          "can_create_milestone": true,
          "can_create_relationships": true,
          "can_create_tasks": true,
          "can_create_workspace_doc": true,
          "can_delete_baseline": true,
          "can_delete_checklist_item": true,
          "can_edit_agents": true,
          "can_edit_baseline": true,
          "can_edit_user_groups": true,
          "can_make_tasks_public": true,
          "can_manage_sharing": true,
          "can_pin_fields": true,
          "can_read": true,
          "can_resolve_checklist_item_if_assigned": true,
          "can_set_default_permission_level": true,
          "can_view_agents": true,
          "can_create_vibeup_app": true,
          "can_view_vibeup_app": true,
          "can_edit_vibeup_app": true,
          "can_create_vibeup_chat": true,
          "can_view_vibeup_chat": true,
          "can_edit_vibeup_chat": true,
          "can_view_baselines": true,
          "change_assignee": 2,
          "change_clickapps": true,
          "change_description": true,
          "change_due_date": true,
          "change_incoming_address": true,
          "change_points_estimate": true,
          "change_priority": true,
          "change_recurring": true,
          "change_status": true,
          "change_time_estimate": true,
          "change_title": true,
          "chat_add_followers": true,
          "chat_add_self_follower": true,
          "chat_comment": true,
          "chat_create_channel": true,
          "chat_delete_channel": true,
          "chat_manage_tiles": true,
          "chat_remove_followers": true,
          "chat_remove_members": true,
          "chat_remove_self_follower": true,
          "chat_reply": true,
          "comment": true,
          "create_private_view": true,
          "create_public_view": true,
          "create_view": true,
          "delete": true,
          "delete_view": true,
          "duplicate": true,
          "edit_attachments": true,
          "edit_checklists": true,
          "edit_goal": true,
          "edit_list_details": true,
          "edit_view": true,
          "like_comments": true,
          "manage_custom_fields": true,
          "manage_workspace_user_profile": true,
          "merge": true,
          "move_goal": true,
          "move_task": true,
          "remove_attachments": true,
          "remove_dependencies": true,
          "remove_followers": true,
          "remove_self_follower": true,
          "remove_status": true,
          "remove_tags": true,
          "set_custom_field_values": true,
          "template": true,
          "track_time": true,
          "unshare": true
        },
        "permission_level": 5,
        "date_added": "1702688678572",
        "role": 1,
        "role_subtype": 0,
        "role_key": "owner"
      }
    ],
    "time_spent": "0"
  }
}

const users = {
  workspace_users: [
    {
      object_id: "48763417",
      status: "found",
      data: {
        user: {
          id: 48763417,
          name: "Peter Jaber",
          initials: "PJ",
          status: "active",
          email_address: "peterjaberau@gmail.com",
          avatar: {
            color: "#ea80fc",
          },
          email_settings: {
            is_bounced: false,
            is_verified: true,
          },
          time_settings: {
            timezone: "Australia/Sydney",
            timezone_offset: -600,
          },
          profile_settings: {
            display_profile: true,
          },
          security_settings: {
            twofa_enabled: 0,
            twofa_totp_enabled: false,
            twofa_text_enabled: false,
          },
          session: {
            last_active: 1769665574240,
          },
          settings: {
            default_workspace_id: 36698333,
          },
          _version_vector: {
            object_type: "user",
            object_id: "48763417",
            workspace_id: 100,
            vector: [],
          },
        },
        workspace_membership: {
          workspace_id: 36698333,
          role_id: 1,
          role_subtype: 0,
          active: true,
          order_index: 1,
          frozen: false,
          userid: 48763417,
          role_key: "owner",
          guest_details: {
            is_internal: false,
          },
          invite: {
            pending: false,
            sent: true,
            first_reminder_sent: false,
            accepted_on: 1649012241023,
            audit: {
              type: "created",
              userid: null,
              timestamp: 1649012241023,
            },
          },
          groups: [],
          _version_vector: {
            object_type: "userAccess",
            object_id: "48763417",
            workspace_id: 36698333,
            vector: [
              {
                master_id: 27,
                version: 1764110932055000,
                deleted: false,
              },
            ],
          },
        },
      },
    },
  ],
}

const team = [
  {
    "id": "36698333",
    "color": "#1b5e20",
    "trial_count": 1,
    "using_github": false,
    "using_gitlab": null,
    "setup_step": "project",
    "color_theme": null,
    "personal_team": true,
    "should_encrypt": false,
    "gantt_trial_end": null,
    "require_2fa": false,
    "hours_per_day": null,
    "plan_id": "1",
    "billed_users_this_cycle": 1,
    "minimum_seats": null,
    "free_seats": null,
    "billed_plan_id": "1",
    "time_tracking_display_hours": true,
    "time_estimate_display_hours": true,
    "disable_public_sharing": null,
    "disable_never_expire_pub_links": false,
    "pub_links_max_year": false,
    "estimates_per_assignee": null,
    "points_per_assignee": null,
    "nested_subtasks": true,
    "nested_subtasks_level": 3,
    "time_in_status": null,
    "charge_for_internal_guests": true,
    "quick_create_statuses": true,
    "universal_search": true,
    "microsoft_365_preview": true,
    "extra_comment_reactions": true,
    "trial_plan_id": null,
    "allow_skip_2fa": true,
    "lineup": true,
    "threaded_comments": true,
    "admin_public_share_override": true,
    "enable_recorder": true,
    "docs_home": true,
    "hipaa_compliant": false,
    "live_view": 2,
    "automation_enabled": true,
    "ai_enabled": true,
    "user_presence": true,
    "is_ai_hidden": false,
    "task_relationships": true,
    "can_add_guests": null,
    "can_remove_guests": null,
    "wip_limit": false,
    "hide_everything_calendar": false,
    "hide_everything_board": false,
    "emails_as_replies": false,
    "custom_sprint_duration": false,
    "time_tracking_rollup": true,
    "disable_template_pub_sharing": false,
    "time_estimate_rollup": true,
    "enable_codox": true,
    "dashboards_enabled": true,
    "unstarted_status_group": true,
    "tasks_in_multiple_lists": true,
    "subtasks_in_multiple_lists": false,
    "points_estimate_rollup": false,
    "giphy": true,
    "points_scale": [
      1,
      2,
      3,
      5,
      8
    ],
    "custom_fields_legacy_ordering": false,
    "role": 1,
    "role_subtype": 0,
    "date_joined": "1649012241023",
    "date_invited": "1649012241023",
    "invite": false,
    "invited_by": null,
    "receive_notifs_gh_commit": true,
    "bypass_sso": null,
    "owner": {
      "id": 48763417,
      "username": "Peter Jaber",
      "email": "peterjaberau@gmail.com",
      "color": "#ea80fc",
      "initials": "PJ",
      "profilePicture": null
    },
    "name": "Peter Jaber's Workspace",
    "next_bill_date": "1680548241023",
    "date_created": "1649012241023",
    "service_status": 1,
    "next_renewal_retry_date": null,
    "grace_period_end": null,
    "next_rollup_retry_date": null,
    "rollup_grace_period_end": null,
    "billingexceptionpopupdismissed": null,
    "was_trial": false,
    "stored_promo_code": null,
    "address": null,
    "dashboard_data_date": null,
    "orderindex": "1",
    "workspace_inaccessible": false,
    "sso": {},
    "plan_tier": "FreeForever",
    "avatar": null,
    "initials": "P",
    "notification_settings": {
      "receive_emails": true,
      "new_task_notifs": 0,
      "fields": {
        "gh_commit": true
      }
    },
    "listViewSettings": {
      "visible": {
        "due_date": true,
        "start_date": false,
        "date_created": false,
        "date_updated": true,
        "priority": true,
        "assignees": true,
        "task_id": false,
        "time_spent": false
      },
      "sorting": []
    },
    "storage": 0.13,
    "storage_per_user": 0,
    "member_count": "1",
    "member_count_wo_invites": "1",
    "time_tracking_default_to_billable": 0,
    "task_duration": false,
    "chat_context": {
      "source": "auto-enablement"
    },
    "chat_enabled": true,
    "notetaker_enabled": true,
    "user_schedules": {
      "enabled": true
    },
    "members": [
      {
        "user": {
          "id": 48763417,
          "username": "Peter Jaber",
          "username_alias": null,
          "description": null,
          "email": "peterjaberau@gmail.com",
          "email_alias": null,
          "color": "#ea80fc",
          "initials": "PJ",
          "profilePicture": null,
          "profileInfo": {
            "display_profile": true,
            "verified_ambassador": null,
            "verified_consultant": null,
            "top_tier_user": null,
            "ai_expert": null,
            "viewed_verified_ambassador": null,
            "viewed_verified_consultant": null,
            "viewed_top_tier_user": null,
            "viewed_ai_expert": null,
            "status": {}
          },
          "banned_date": null,
          "status": "active"
        },
        "twofa_enabled": "0",
        "twofa_totp_enabled": false,
        "twofa_text_enabled": false,
        "invite": false,
        "role": 1,
        "role_subtype": 0,
        "role_key": "owner",
        "role_permissions": {},
        "last_active": "1769665574240",
        "date_joined": "1649012241023",
        "date_invited": "1649012241023",
        "auto_send_invoices": false,
        "can_see_time_spent": null,
        "can_see_time_estimated": null,
        "can_see_points_estimated": null,
        "can_create_views": false,
        "can_edit_tags": false,
        "custom_role": null,
        "manager": null,
        "bypass_sso": null
      }
    ],
    "role_key": "owner"
  }
]

const templateHistory = [
  {
    id: "68466759-f08e-4901-8949-ea3302a2d9c3",
    templateType: "CATEGORY",
    permanentTemplateId: "t-140176478",
    templateName: "Content Management",
    templateAction: "TEMPLATE_APPLICATION",
    templateActionStatus: "SUCCESS",
    startDate: 1764118690314,
    endDate: 1764118750878,
    executionDuration: 60560,
    copiedTasksAndSubtasksCount: 125,
    locationId: "90167549660",
    locationName: "Content",
    locationPath: "Space/Content",
    errorMessage: null,
    templateUserState: {
      is_dismissed: false,
    },
    sourceTemplateId: "t-140176478",
    progress: {
      templateSize: {
        lists: 0,
        tasks: 0,
        total: 0,
        views: 0,
        spaces: 0,
        folders: 0,
      },
      copiedObjectCounts: {
        lists: 0,
        tasks: 0,
        total: 0,
        views: 0,
        spaces: 0,
        folders: 0,
      },
    },
  },
  {
    id: "432bcc7d-d13a-459f-bbd5-e9c8219491e1",
    templateType: "PROJECT",
    permanentTemplateId: "t-90100000747",
    templateName: "Agency Management",
    templateAction: "TEMPLATE_APPLICATION",
    templateActionStatus: "SUCCESS",
    startDate: 1764118636733,
    endDate: 1764118726999,
    executionDuration: 90191,
    copiedTasksAndSubtasksCount: 233,
    locationId: "90165702185",
    locationName: null,
    locationPath: "Agency Management",
    errorMessage: null,
    templateUserState: {
      is_dismissed: false,
    },
    sourceTemplateId: "t-90100000747",
    progress: {
      templateSize: {
        lists: 0,
        tasks: 0,
        total: 0,
        views: 0,
        spaces: 0,
        folders: 0,
      },
      copiedObjectCounts: {
        lists: 0,
        tasks: 0,
        total: 0,
        views: 0,
        spaces: 0,
        folders: 0,
      },
    },
  },
  {
    id: "90f2aa20-6a68-44ae-ba69-92624ec7cb41",
    templateType: "VIEW",
    permanentTemplateId: "kkmvq-61531",
    templateName: "Project Overview",
    templateAction: "TEMPLATE_APPLICATION",
    templateActionStatus: "SUCCESS",
    startDate: 1758601840091,
    endDate: 1758601840879,
    executionDuration: 788,
    copiedTasksAndSubtasksCount: 0,
    locationId: "12zy6x-4136",
    locationName: null,
    locationPath: "Project Overview",
    errorMessage: null,
    templateUserState: {
      view_type: 9,
      is_dismissed: false,
    },
    sourceTemplateId: "kkmvq-61531",
    progress: {
      copiedObjectCounts: {
        total: 0,
        views: 0,
        tasks: 0,
        lists: 0,
        folders: 0,
        spaces: 0,
      },
      templateSize: {
        total: 0,
        spaces: 0,
        folders: 0,
        lists: 0,
        tasks: 0,
        views: 0,
      },
    },
  },
  {
    id: "cbfcdf3b-c740-400f-bac2-6903c02dcd49",
    templateType: "TASK",
    permanentTemplateId: "t-3338w8f",
    templateName: " Social Media Content Plan",
    templateAction: "TEMPLATE_APPLICATION",
    templateActionStatus: "SUCCESS",
    startDate: 1751717754956,
    endDate: 1751717763069,
    executionDuration: 8113,
    copiedTasksAndSubtasksCount: 11,
    locationId: "86czhwvz7",
    locationName: null,
    locationPath: "Brainstorming/AppMachine/ Social Media Content Plan",
    errorMessage: null,
    templateUserState: {
      is_dismissed: false,
    },
    sourceTemplateId: "3338w8f",
    progress: {
      copiedObjectCounts: {
        total: 0,
        views: 0,
        tasks: 0,
        lists: 0,
        folders: 0,
        spaces: 0,
      },
      templateSize: {
        total: 0,
        spaces: 0,
        folders: 0,
        lists: 0,
        tasks: 0,
        views: 0,
      },
    },
  },
  {
    id: "e956861e-2634-4491-a3ad-e60cc41ad11a",
    templateType: "VIEW",
    permanentTemplateId: "kkmvq-14251",
    templateName: "Eisenhower Matrix",
    templateAction: "TEMPLATE_APPLICATION",
    templateActionStatus: "SUCCESS",
    startDate: 1751717632432,
    endDate: 1751717635502,
    executionDuration: 3070,
    copiedTasksAndSubtasksCount: 0,
    locationId: "12zy6x-4096",
    locationName: "Eisenhower Matrix",
    locationPath: "Eisenhower Matrix",
    errorMessage: null,
    templateUserState: {
      view_type: 27,
      is_dismissed: false,
    },
    sourceTemplateId: "kkmvq-14251",
    progress: {
      copiedObjectCounts: {
        total: 0,
        views: 0,
        tasks: 0,
        lists: 0,
        folders: 0,
        spaces: 0,
      },
      templateSize: {
        total: 0,
        spaces: 0,
        folders: 0,
        lists: 0,
        tasks: 0,
        views: 0,
      },
    },
  },
  {
    id: "9c71ea5b-cc42-472b-8a1f-a10e06ddd4da",
    templateType: "VIEW",
    permanentTemplateId: "kkmvq-14151",
    templateName: "Concept Map",
    templateAction: "TEMPLATE_APPLICATION",
    templateActionStatus: "SUCCESS",
    startDate: 1747416665058,
    endDate: 1747416667906,
    executionDuration: 2849,
    copiedTasksAndSubtasksCount: 0,
    locationId: "12zy6x-4076",
    locationName: "Concept Map",
    locationPath: "Concept Map",
    errorMessage: null,
    templateUserState: {
      view_type: 27,
      is_dismissed: false,
    },
    sourceTemplateId: "kkmvq-14151",
    progress: {
      copiedObjectCounts: {
        total: 0,
        views: 0,
        tasks: 0,
        lists: 0,
        folders: 0,
        spaces: 0,
      },
      templateSize: {
        total: 0,
        spaces: 0,
        folders: 0,
        lists: 0,
        tasks: 0,
        views: 0,
      },
    },
  },
  {
    id: "72576249-40a0-4c7b-9c27-a1417abbe862",
    templateType: "VIEW",
    permanentTemplateId: "kkmvq-3031728",
    templateName: "SOP Template",
    templateAction: "TEMPLATE_APPLICATION",
    templateActionStatus: "SUCCESS",
    startDate: 1715130325371,
    endDate: 1715130330386,
    executionDuration: 5015,
    copiedTasksAndSubtasksCount: 0,
    locationId: "12zy6x-3976",
    locationName: "SOP Template",
    locationPath: "SOP Template",
    errorMessage: null,
    templateUserState: {
      view_type: 9,
      is_dismissed: false,
    },
    sourceTemplateId: "kkmvq-3031728",
    progress: {
      copiedObjectCounts: {
        total: 0,
        views: 0,
        tasks: 0,
        lists: 0,
        folders: 0,
        spaces: 0,
      },
      templateSize: {
        total: 0,
        spaces: 0,
        folders: 0,
        lists: 0,
        tasks: 0,
        views: 0,
      },
    },
  },
]

const projectFeatures = {
  projects: [
    {
      id: "54779505",
      default_category: "90167549660",
      default_preset_view: 1,
      preset_views: [1, 2],
      features: {
        due_dates: {
          enabled: true,
          start_date: true,
          remap_due_dates: false,
          remap_closed_due_date: false,
        },
        sprints: {
          enabled: true,
        },
        time_tracking: {
          enabled: true,
          harvest: false,
          rollup: false,
          default_to_billable: 2,
        },
        points: {
          enabled: false,
        },
        custom_items: {
          enabled: false,
        },
        priorities: {
          enabled: true,
          priorities: [
            {
              color: "#f50000",
              id: "1",
              orderindex: "1",
              priority: "urgent",
            },
            {
              color: "#f8ae00",
              id: "2",
              orderindex: "2",
              priority: "high",
            },
            {
              color: "#6fddff",
              id: "3",
              orderindex: "3",
              priority: "normal",
            },
            {
              color: "#d8d8d8",
              id: "4",
              orderindex: "4",
              priority: "low",
            },
          ],
        },
        tags: {
          enabled: true,
        },
        check_unresolved: {
          enabled: true,
          subtasks: true,
          checklists: null,
          comments: null,
        },
        milestones: {
          enabled: true,
        },
        custom_fields: {
          enabled: true,
        },
        status_pies: {
          enabled: false,
        },
        scheduler_enabled: false,
        dependency_type_enabled: false,
        dependency_enforcement: {
          enforcement_enabled: false,
          enforcement_mode: 0,
        },
        reschedule_closed_dependencies: true,
      },
    },
    {
      id: "90160270462",
      default_category: null,
      default_preset_view: 1,
      preset_views: [1, 2],
      features: {
        due_dates: {
          enabled: true,
          start_date: true,
          remap_due_dates: false,
          remap_closed_due_date: false,
        },
        sprints: {
          enabled: false,
        },
        time_tracking: {
          enabled: true,
          harvest: false,
          rollup: true,
          default_to_billable: 2,
        },
        points: {
          enabled: false,
        },
        custom_items: {
          enabled: false,
        },
        priorities: {
          enabled: true,
          priorities: [
            {
              color: "#f50000",
              id: "1",
              orderindex: "1",
              priority: "urgent",
            },
            {
              color: "#f8ae00",
              id: "2",
              orderindex: "2",
              priority: "high",
            },
            {
              color: "#6fddff",
              id: "3",
              orderindex: "3",
              priority: "normal",
            },
            {
              color: "#d8d8d8",
              id: "4",
              orderindex: "4",
              priority: "low",
            },
          ],
        },
        tags: {
          enabled: true,
        },
        check_unresolved: {
          enabled: true,
          subtasks: null,
          checklists: null,
          comments: null,
        },
        milestones: {
          enabled: false,
        },
        custom_fields: {
          enabled: true,
        },
        remap_dependencies: {
          enabled: true,
        },
        dependency_warning: {
          enabled: true,
        },
        status_pies: {
          enabled: false,
        },
        multiple_assignees: {
          enabled: true,
        },
        emails: {
          enabled: true,
        },
        scheduler_enabled: false,
        dependency_type_enabled: false,
        dependency_enforcement: {
          enforcement_enabled: false,
          enforcement_mode: 0,
        },
        reschedule_closed_dependencies: true,
      },
    },
    {
      id: "90162239934",
      default_category: "90163043636",
      default_preset_view: 1,
      preset_views: [1, 20],
      features: {
        due_dates: {
          enabled: true,
          start_date: true,
          remap_due_dates: true,
          remap_closed_due_date: false,
        },
        sprints: {
          enabled: false,
        },
        time_tracking: {
          enabled: true,
          harvest: false,
          rollup: true,
          default_to_billable: 2,
        },
        points: {
          enabled: false,
        },
        custom_items: {
          enabled: false,
        },
        priorities: {
          enabled: true,
          priorities: [
            {
              color: "#f50000",
              id: "1",
              orderindex: "1",
              priority: "urgent",
            },
            {
              color: "#f8ae00",
              id: "2",
              orderindex: "2",
              priority: "high",
            },
            {
              color: "#6fddff",
              id: "3",
              orderindex: "3",
              priority: "normal",
            },
            {
              color: "#d8d8d8",
              id: "4",
              orderindex: "4",
              priority: "low",
            },
          ],
        },
        tags: {
          enabled: true,
        },
        time_estimates: {
          enabled: true,
          rollup: true,
          per_assignee: false,
        },
        check_unresolved: {
          enabled: true,
          subtasks: null,
          checklists: null,
          comments: null,
        },
        milestones: {
          enabled: true,
        },
        custom_fields: {
          enabled: true,
        },
        remap_dependencies: {
          enabled: true,
        },
        dependency_warning: {
          enabled: true,
        },
        status_pies: {
          enabled: true,
        },
        multiple_assignees: {
          enabled: true,
        },
        emails: {
          enabled: true,
        },
        scheduler_enabled: false,
        dependency_type_enabled: false,
        dependency_enforcement: {
          enforcement_enabled: false,
          enforcement_mode: 0,
        },
        reschedule_closed_dependencies: true,
      },
    },
    {
      id: "90164883300",
      default_category: "90166357565",
      default_preset_view: 1,
      preset_views: [1, 2],
      features: {
        due_dates: {
          enabled: true,
          start_date: true,
          remap_due_dates: false,
          remap_closed_due_date: false,
        },
        sprints: {
          enabled: false,
        },
        time_tracking: {
          enabled: true,
          harvest: false,
          rollup: true,
          default_to_billable: 2,
        },
        points: {
          enabled: false,
        },
        custom_items: {
          enabled: false,
        },
        priorities: {
          enabled: true,
          priorities: [
            {
              color: "#f50000",
              id: "1",
              orderindex: "1",
              priority: "urgent",
            },
            {
              color: "#f8ae00",
              id: "2",
              orderindex: "2",
              priority: "high",
            },
            {
              color: "#6fddff",
              id: "3",
              orderindex: "3",
              priority: "normal",
            },
            {
              color: "#d8d8d8",
              id: "4",
              orderindex: "4",
              priority: "low",
            },
          ],
        },
        tags: {
          enabled: true,
        },
        time_estimates: {
          enabled: true,
          rollup: true,
          per_assignee: false,
        },
        check_unresolved: {
          enabled: true,
          subtasks: null,
          checklists: null,
          comments: null,
        },
        milestones: {
          enabled: true,
        },
        custom_fields: {
          enabled: true,
        },
        remap_dependencies: {
          enabled: true,
        },
        dependency_warning: {
          enabled: true,
        },
        status_pies: {
          enabled: true,
        },
        multiple_assignees: {
          enabled: true,
        },
        emails: {
          enabled: true,
        },
        scheduler_enabled: false,
        dependency_type_enabled: false,
        dependency_enforcement: {
          enforcement_enabled: false,
          enforcement_mode: 0,
        },
        reschedule_closed_dependencies: true,
      },
    },
    {
      id: "90165701328",
      default_category: null,
      default_preset_view: 1,
      preset_views: [1],
      features: {
        due_dates: {
          enabled: true,
          start_date: true,
          remap_due_dates: false,
          remap_closed_due_date: false,
        },
        sprints: {
          enabled: false,
        },
        points: {
          enabled: false,
        },
        custom_items: {
          enabled: false,
        },
        milestones: {
          enabled: false,
        },
        custom_fields: {
          enabled: true,
        },
        remap_dependencies: {
          enabled: true,
        },
        dependency_warning: {
          enabled: true,
        },
        status_pies: {
          enabled: false,
        },
        multiple_assignees: {
          enabled: true,
        },
        emails: {
          enabled: true,
        },
        time_tracking: {
          default_to_billable: 2,
        },
        scheduler_enabled: false,
        dependency_type_enabled: false,
        dependency_enforcement: {
          enforcement_enabled: false,
          enforcement_mode: 0,
        },
        reschedule_closed_dependencies: true,
      },
    },
    {
      id: "90165702185",
      default_category: "90167549650",
      default_preset_view: 1,
      preset_views: [1],
      features: {
        due_dates: {
          enabled: true,
          start_date: true,
          remap_due_dates: true,
          remap_closed_due_date: false,
        },
        sprints: {
          enabled: false,
        },
        time_tracking: {
          enabled: true,
          harvest: false,
          rollup: false,
          default_to_billable: 2,
        },
        points: {
          enabled: false,
        },
        custom_items: {
          enabled: false,
        },
        priorities: {
          enabled: true,
          priorities: [
            {
              color: "#f50000",
              id: "1",
              orderindex: "1",
              priority: "urgent",
            },
            {
              color: "#f8ae00",
              id: "2",
              orderindex: "2",
              priority: "high",
            },
            {
              color: "#6fddff",
              id: "3",
              orderindex: "3",
              priority: "normal",
            },
            {
              color: "#d8d8d8",
              id: "4",
              orderindex: "4",
              priority: "low",
            },
          ],
        },
        tags: {
          enabled: true,
        },
        time_estimates: {
          enabled: true,
          rollup: false,
          per_assignee: false,
        },
        check_unresolved: {
          enabled: true,
          subtasks: null,
          checklists: null,
          comments: null,
        },
        milestones: {
          enabled: false,
        },
        custom_fields: {
          enabled: true,
        },
        dependency_warning: {
          enabled: true,
        },
        status_pies: {
          enabled: false,
        },
        multiple_assignees: {
          enabled: true,
        },
        emails: {
          enabled: true,
        },
        scheduler_enabled: false,
        dependency_type_enabled: false,
        dependency_enforcement: {
          enforcement_enabled: false,
          enforcement_mode: 0,
        },
        reschedule_closed_dependencies: true,
      },
    },
  ],
}

const entitlments = {
  "activity_view": {
    "type": "limit",
    "entitled": true,
    "limit": 1,
    "dataIsComplete": true
  },
  "baselines_limit": {
    "type": "limit",
    "entitled": false,
    "limit": 0,
    "dataIsComplete": true
  },
  "team_analytics": {
    "type": "limit",
    "entitled": false,
    "limit": 0,
    "dataIsComplete": true
  },
  "doc_wiki_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 1,
    "dataIsComplete": true
  },
  "chat_history_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 30,
    "dataIsComplete": true
  },
  "checklist_item_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 500,
    "dataIsComplete": true
  },
  "checklist_item_length_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 2000,
    "dataIsComplete": true
  },
  "email_free_accounts": {
    "type": "limit",
    "entitled": true,
    "limit": 1,
    "dataIsComplete": true
  },
  "email_addon_accounts": {
    "type": "limit",
    "entitled": false,
    "limit": 0,
    "dataIsComplete": true
  },
  "folder_limits": {
    "type": "limit",
    "entitled": true,
    "limit": 100,
    "dataIsComplete": true
  },
  "list_limits": {
    "type": "limit",
    "entitled": true,
    "limit": 100,
    "dataIsComplete": true
  },
  "list_task_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 50000,
    "dataIsComplete": true
  },
  "project_storage_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 104857600,
    "dataIsComplete": true
  },
  "project_clip_storage_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 104857600,
    "dataIsComplete": true
  },
  "public_api_rate_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 100,
    "dataIsComplete": true
  },
  "user_storage_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 107374182.4,
    "dataIsComplete": true
  },
  "task_attachment_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 1000,
    "dataIsComplete": true
  },
  "task_checklist_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 250,
    "dataIsComplete": true
  },
  "task_linked_tasks_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 6500,
    "dataIsComplete": true
  },
  "task_tag_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 600,
    "dataIsComplete": true
  },
  "whiteboards_views_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 3,
    "dataIsComplete": true
  },
  "automation_trigger_limit": {
    "type": "limit",
    "entitled": true,
    "limit": "Infinity",
    "dataIsComplete": true
  },
  "audit_logs_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 1,
    "dataIsComplete": true
  },
  "subtask_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 1000,
    "dataIsComplete": true
  },
  "subtask_archived_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 10000,
    "dataIsComplete": true
  },
  "workspace_daily_invite_warning_limit": {
    "type": "limit",
    "entitled": true,
    "limit": 30,
    "dataIsComplete": true
  },
  "advanced_card_views": {
    "type": "counter",
    "entitled": false,
    "planLimits": 0,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "ai_usage": {
    "type": "counter",
    "entitled": true,
    "planLimits": 75,
    "limit": 75,
    "usage": 8,
    "usageLeft": 67,
    "dataIsComplete": true
  },
  "automation_actions": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": false
  },
  "attachment_comments": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "basic_card_views": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": true
  },
  "chat_usage_message_limit": {
    "type": "counter",
    "entitled": true,
    "planLimits": 1000,
    "limit": 1000,
    "usage": 0,
    "usageLeft": 1000,
    "dataIsComplete": true
  },
  "chat_usage_post_limit": {
    "type": "counter",
    "entitled": true,
    "planLimits": 30,
    "limit": 30,
    "usage": 0,
    "usageLeft": 30,
    "dataIsComplete": true
  },
  "chat_usage_syncup_limit": {
    "type": "counter",
    "entitled": true,
    "planLimits": 18000,
    "limit": 18000,
    "usage": 0,
    "usageLeft": 18000,
    "dataIsComplete": true
  },
  "custom_field_manual_ai_usages": {
    "type": "counter",
    "entitled": false,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": false
  },
  "custom_field_automated_ai_usages": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "custom_field_values": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 8,
    "usageLeft": 92,
    "dataIsComplete": true
  },
  "automated_ai_agent_usages": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "custom_ai_agent_usages": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "super_agent_usages": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "custom_items": {
    "type": "counter",
    "entitled": true,
    "planLimits": 20,
    "limit": 20,
    "usage": 0,
    "usageLeft": 20,
    "dataIsComplete": true
  },
  "dashboards": {
    "type": "counter",
    "entitled": false,
    "planLimits": 100,
    "limit": 100,
    "usage": 106,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "default_views": {
    "type": "counter",
    "entitled": false,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "document_tags": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "emails": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "embed_view": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": true
  },
  "gantt_view": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 32,
    "usageLeft": 68,
    "dataIsComplete": true
  },
  "gantt_critical_path": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": true
  },
  "goals": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 3,
    "usageLeft": 97,
    "dataIsComplete": true
  },
  "list_exports": {
    "type": "counter",
    "entitled": true,
    "planLimits": 5,
    "limit": 5,
    "usage": 0,
    "usageLeft": 5,
    "dataIsComplete": true
  },
  "live_view": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "location_overview": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": true
  },
  "map_view": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 16,
    "usageLeft": 84,
    "dataIsComplete": true
  },
  "mindmap_view": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 78,
    "usageLeft": 22,
    "dataIsComplete": true
  },
  "points": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "portfolios": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 2,
    "usageLeft": 98,
    "dataIsComplete": true
  },
  "protect_views": {
    "type": "counter",
    "entitled": false,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "scheduled_reports": {
    "type": "counter",
    "entitled": true,
    "planLimits": 40,
    "limit": 40,
    "usage": 0,
    "usageLeft": 40,
    "dataIsComplete": true
  },
  "siml": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": false
  },
  "siml_legacy": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "task_manual_ai_usages": {
    "type": "counter",
    "entitled": false,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": false
  },
  "task_automated_ai_usages": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "table_exports": {
    "type": "counter",
    "entitled": true,
    "planLimits": 5,
    "limit": 5,
    "usage": 0,
    "usageLeft": 5,
    "dataIsComplete": true
  },
  "timl": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "timl_legacy": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 12,
    "usageLeft": "Infinity",
    "dataIsComplete": true
  },
  "timeline_view": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 10,
    "usageLeft": 90,
    "dataIsComplete": true
  },
  "user_advanced_time_tracking": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "user_time_tracking": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "timesheet_approvals_usage": {
    "type": "counter",
    "entitled": true,
    "planLimits": 100,
    "limit": 100,
    "usage": 0,
    "usageLeft": 100,
    "dataIsComplete": true
  },
  "views": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 60,
    "usageLeft": "Infinity",
    "dataIsComplete": true
  },
  "workload_view": {
    "type": "counter",
    "entitled": false,
    "planLimits": 100,
    "limit": 100,
    "usage": 102,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "milestones": {
    "type": "counter",
    "entitled": true,
    "planLimits": 10,
    "limit": 10,
    "usage": 0,
    "usageLeft": 10,
    "dataIsComplete": true
  },
  "team_view": {
    "type": "counter",
    "entitled": false,
    "planLimits": 0,
    "limit": 0,
    "usage": 1,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "free_aggregated_auto_ai": {
    "type": "counter",
    "entitled": true,
    "planLimits": 500,
    "limit": 1500,
    "usage": 0,
    "usageLeft": 1500,
    "dataIsComplete": true
  },
  "paid_aggregated_auto_ai": {
    "type": "counter",
    "entitled": true,
    "planLimits": 0,
    "limit": 1000,
    "usage": 0,
    "usageLeft": 1000,
    "dataIsComplete": false
  },
  "aggregated_auto_ai": {
    "type": "counter",
    "entitled": true,
    "planLimits": 500,
    "limit": 1500,
    "usage": 0,
    "usageLeft": 1500,
    "dataIsComplete": false
  },
  "lifetime_ai_meeting_bot": {
    "type": "counter",
    "entitled": true,
    "planLimits": 18000,
    "limit": 18000,
    "usage": 0,
    "usageLeft": 18000,
    "dataIsComplete": true
  },
  "recurring_ai_meeting_bot": {
    "type": "counter",
    "entitled": false,
    "planLimits": 0,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": false
  },
  "ai_meeting_bot": {
    "type": "counter",
    "entitled": true,
    "planLimits": 18000,
    "limit": 18000,
    "usage": 0,
    "usageLeft": 18000,
    "dataIsComplete": false
  },
  "cards_automated_ai_usages": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "timl_and_siml": {
    "type": "counter",
    "entitled": false,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "image_generation": {
    "type": "counter",
    "entitled": true,
    "planLimits": "Infinity",
    "limit": "Infinity",
    "usage": 0,
    "usageLeft": "Infinity",
    "dataIsComplete": false
  },
  "ai_voice_to_text": {
    "type": "counter",
    "entitled": true,
    "planLimits": 2000,
    "limit": 2000,
    "usage": 0,
    "usageLeft": 2000,
    "dataIsComplete": true
  },
  "custom_roles": {
    "type": "readOnlyCount",
    "entitled": false,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "custom_permission_levels": {
    "type": "readOnlyCount",
    "entitled": false,
    "limit": 0,
    "usage": 0,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "project_limits": {
    "type": "readOnlyCount",
    "entitled": true,
    "limit": 5,
    "usage": 4,
    "usageLeft": 1,
    "dataIsComplete": true
  },
  "teams": {
    "type": "readOnlyCount",
    "entitled": true,
    "limit": 2,
    "usage": 0,
    "usageLeft": 2,
    "dataIsComplete": true
  },
  "form_view_utilization": {
    "type": "readOnlyCount",
    "entitled": false,
    "limit": 1,
    "usage": 14,
    "usageLeft": 0,
    "dataIsComplete": true
  },
  "action_report_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "admin_can_manage": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "admin_control_private_fields": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "advanced_form_view": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "advanced_views": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "advanced_work_schedules": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "ai_enabled": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "audit_logs": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "automation_actions_paywall": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "automation_conditions_paywall": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "automated_integrations": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "automation_webhooks_action": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "automation_addons": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "authenticated_forms": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "azure_sso": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "billable_report_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "box_view": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "calculation_columns": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "change_task_priority": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "cloud_attachments": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "cumulative_flow_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "custom_bar_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "custom_battery_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "custom_branding": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "custom_calculation_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "custom_line_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "custom_pie_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "custom_task_ids": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "cycle_time_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "durations": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "edit_resource_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "email_add_account": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "email_signatures": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "email_templates": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "expire_public_links": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "export_tasks": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "field_level_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "file_storage": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "form_view": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "future_recurring_tasks": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "gantt_view_exports": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "goals_folders": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "google_calendar_advanced": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "google_sso": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "granular_default_permission_level": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "granular_space_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "granular_field_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "granular_time_estimates": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "granular_views_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "guest_card_visibility_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "guest_public_api": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "guest_seats_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "hidden_cf_guests": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "hubspot": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "invite_guest_article_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "invite_guest_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "invite_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "lead_time_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "legacy_burndown_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "legacy_burnup_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "legacy_velocity_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "list_assignee": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "list_priority": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "logic_in_forms": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "make_new_spaces_private": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "manage_workspace_public_sharing": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "okta_sso": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "onedrive": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "owner_control_private_spaces": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "paid_plan": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "plug_and_play": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "points_per_assignee": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "portfolio_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "portfolio_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "portfolio_widget_filter_by_category": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "priority_over_time_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "private_docs": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "private_views": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "private_whiteboards": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "productivity_power_pack": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "productivity_starter_pack": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "protect_docs": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "public_link_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "public_views": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "publicly_shared_items": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "purchase_sa_ai_addon_v1": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "purchase_sa_ai_addon_v2": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "paid_workspace": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "reporting": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "required_cf": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "rollup": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sales_assisted_team": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "salesforce": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "saml_sso": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "scim": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "send_trial_email": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "session_settings": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sharepoint": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "show_recurring_tasks": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "skip_non_working_days": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sprint_automation": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sprint_burndown_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sprint_burnup_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sprint_reporting_dashboard": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sprint_rollover": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sprint_velocity_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sso_required": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "status_over_time_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "storage_override": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "sync_up": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "tableau": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "tags_usage_over_time_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "team_public_items": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "team_sharing": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "team_sharing_space": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "time_estimates_per_assignee": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "time_estimated_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "time_in_status": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "time_in_status_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "time_reporting_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "time_tracked_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "time_tracking_reporting": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "timesheet_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "twofa_required": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "universal_search_private": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "universal_search_shared": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "unlimited_individual_guest_permissions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "unlimited_permission_items": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "user_bonus_claimed_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "user_timesheet": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "user_schedules": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "white_labeling": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "whos_behind_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "widgets_priority_queue": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "wip_limits": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "worked_on_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "workload_groupings": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "workload_view_capacity": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "workspace_churn_survey": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "workspace_points_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "workspace_scoped_chat_comment_retention_setting": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "workspace_users_export": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "field_move": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "field_merge": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "field_pin": {
    "type": "flag",
    "entitled": true,
    "dataIsComplete": true
  },
  "delegate_reminders": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "space_granular_default_permission_level": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "guest_field_visibility_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "public_template_restrictions": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "search_box_files_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "search_confluence_files_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "search_dropbox_files_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "search_figma_files_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "search_g_drive_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "search_github_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "search_widget": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "scheduled_send_chat": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "scheduled_send_email": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  },
  "syncup_ai_meeting_notetaker": {
    "type": "flag",
    "entitled": false,
    "dataIsComplete": true
  }
}

const member = {
  members: [
    {
      user: {
        id: 48763417,
        username: "Peter Jaber",
        username_alias: null,
        description: null,
        email: "peterjaberau@gmail.com",
        email_alias: null,
        color: "#ea80fc",
        initials: "PJ",
        profilePicture: null,
        profileInfo: {
          display_profile: true,
          verified_ambassador: null,
          verified_consultant: null,
          top_tier_user: null,
          ai_expert: null,
          viewed_verified_ambassador: null,
          viewed_verified_consultant: null,
          viewed_top_tier_user: null,
          viewed_ai_expert: null,
          status: {},
        },
        banned_date: null,
        status: "active",
      },
      twofa_enabled: "0",
      twofa_totp_enabled: false,
      twofa_text_enabled: false,
      invite: false,
      role: 1,
      role_subtype: 0,
      role_key: "owner",
      role_permissions: {
        add_email_account: true,
        billing: true,
        can_add_team_guests: true,
        can_add_team_limited_members: true,
        can_add_team_members: true,
        can_add_workspace_attachments: true,
        can_be_added_to_spaces: true,
        can_be_added_to_user_groups: true,
        can_convert_item: true,
        can_create_agents: true,
        can_create_custom_permission_level: true,
        can_create_folders: true,
        can_create_goals: true,
        can_create_lists: true,
        can_create_milestone: true,
        can_create_personal_list: true,
        can_create_portfolios: true,
        can_create_projects: true,
        can_create_spaces: true,
        can_create_workload: true,
        can_create_workspace_doc: true,
        can_delete_comments: true,
        can_delete_custom_permission_level: true,
        can_delete_no_access: true,
        can_edit_agents: true,
        can_edit_custom_permission_level: true,
        can_edit_description: true,
        can_edit_integrations: true,
        can_edit_list_statuses: true,
        can_edit_privacy: 2,
        can_edit_project_settings: 2,
        can_edit_space_settings: 2,
        can_edit_team: true,
        can_edit_team_members: true,
        can_edit_team_owner: true,
        can_edit_trial: true,
        can_edit_user_groups: true,
        can_edit_view_protection: true,
        can_enable_sso: true,
        can_export_tasks: true,
        can_gdpr_export: true,
        can_import: true,
        can_list_inaccessible_spaces: true,
        can_make_tasks_public: true,
        can_manage_public_authn: true,
        can_manage_sharing: true,
        can_pin_fields: true,
        can_recover_inaccessible_spaces: true,
        can_see_custom_permission_level: true,
        can_see_data_retention_settings: true,
        can_see_team_members: true,
        can_see_workload: true,
        can_send_login_bypass_link: true,
        can_set_approval_settings: true,
        can_set_data_retention_settings: true,
        can_use_chat: true,
        can_use_git: true,
        can_use_public_api_dev_key: true,
        can_view_agents: true,
        can_create_vibeup_app: true,
        can_view_vibeup_app: true,
        can_edit_vibeup_app: true,
        can_create_vibeup_chat: true,
        can_view_vibeup_chat: true,
        can_edit_vibeup_chat: true,
        can_view_audit_logs: true,
        can_view_lineup_of_others: true,
        can_view_baselines: true,
        can_view_reporting: true,
        can_view_team_timesheet: true,
        chat_add_members: true,
        chat_create_channel: true,
        chat_create_dm: true,
        chat_delete_channel: true,
        create_automation: true,
        create_dashboards: true,
        create_public_view: true,
        custom_roles: true,
        make_views_public: true,
        make_items_public: true,
        manage_custom_fields: true,
        manage_custom_items: true,
        manage_statuses: true,
        manage_tags: true,
        manage_template_tags: true,
        oauth_apps: true,
        profile: true,
        public_spaces_visible: true,
        send_email: true,
        share: true,
        team_permissions: true,
        convert_custom_fields: true,
        create_custom_fields: true,
        delete_custom_fields: true,
        edit_custom_fields: true,
        merge_custom_fields: true,
        move_custom_fields: true,
        can_edit_tags: true,
        can_see_time_spent: true,
        can_see_time_estimated: true,
        can_see_points_estimated: true,
        add_attachments: true,
        add_checklists: false,
        add_dependencies: false,
        add_followers: false,
        add_self_follower: false,
        add_status: false,
        add_subtasks: false,
        add_tags: false,
        archive: false,
        can_add_automation: false,
        can_add_to_lineup: false,
        can_change_subtask_columns: false,
        can_change_task_links: false,
        can_create_baseline: false,
        can_create_folders_pl: false,
        can_create_lists_pl: false,
        can_create_relationships: false,
        can_create_tasks: false,
        can_delete_baseline: false,
        can_delete_checklist_item: true,
        can_edit_baseline: false,
        can_read: false,
        can_resolve_checklist_item_if_assigned: false,
        can_set_default_permission_level: false,
        change_assignee: false,
        change_clickapps: false,
        change_description: false,
        change_due_date: false,
        change_incoming_address: false,
        change_points_estimate: false,
        change_priority: false,
        change_recurring: false,
        change_status: false,
        change_time_estimate: false,
        change_title: false,
        chat_add_followers: false,
        chat_add_self_follower: false,
        chat_comment: false,
        chat_manage_tiles: false,
        chat_remove_followers: false,
        chat_remove_members: false,
        chat_remove_self_follower: false,
        chat_reply: false,
        comment: false,
        create_private_view: false,
        create_view: true,
        delete: true,
        delete_view: true,
        duplicate: false,
        edit_attachments: false,
        edit_checklists: false,
        edit_goal: false,
        edit_list_details: false,
        edit_view: true,
        like_comments: false,
        manage_workspace_user_profile: false,
        merge: false,
        move_goal: false,
        move_task: false,
        remove_attachments: true,
        remove_dependencies: false,
        remove_followers: false,
        remove_self_follower: false,
        remove_status: false,
        remove_tags: false,
        set_custom_field_values: false,
        template: false,
        track_time: false,
        unshare: false,
      },
      last_active: "1769665574240",
      date_joined: "1649012241023",
      date_invited: "1649012241023",
      auto_send_invoices: false,
      can_see_time_spent: null,
      can_see_time_estimated: null,
      can_see_points_estimated: null,
      can_create_views: false,
      can_edit_tags: false,
      custom_role: null,
      manager: null,
      bypass_sso: null,
    },
  ],
}

const tray =  [
  {
    "id": "12zy6x-2182",
    "type": 8,
    "draft": false,
    "orderindex": 1,
    "team_id": "36698333",
    "data": {
      "date_created": "1674137203115",
      "creator": 48763417,
      "name": "Welcome!",
      "type": 9,
      "parent_id_bigint": null,
      "orderindex": 2,
      "visibility": 1,
      "default": false,
      "locked": false,
      "team_id": "36698333",
      "deleted": false,
      "date_deleted": null,
      "public": true,
      "seo_optimized": false,
      "standard": false,
      "date_frozen": null,
      "frozen_note": null,
      "frozen_by": {
        "id": 0,
        "username": null,
        "email": null,
        "color": null,
        "initials": null,
        "profilePicture": null
      },
      "visible_to": "48763417",
      "template_visibility": null,
      "template_visible_to": "32272166",
      "deleted_by": null,
      "locked_permission": null,
      "date_updated": "1731460853508",
      "public_share_expires_on": null,
      "parent_id_text": null,
      "made_public_by": "48763417",
      "share_tasks": null,
      "share_task_fields": [
        "assignees",
        "priority",
        "due_date",
        "content",
        "comments",
        "attachments",
        "customFields",
        "subtasks",
        "tags",
        "checklists",
        "coverimage"
      ],
      "pinned": false,
      "made_public_time": "1731460853496",
      "workload_use_points": null,
      "workload_capacity_type": null,
      "exclude_multiple_lists": null,
      "expanded_tasks": null,
      "template_public": null,
      "share_with_team": null,
      "exclude_sub_multiple_lists": null,
      "relationships_display_setting": null,
      "archived": null,
      "archived_by": null,
      "date_archived": null,
      "sidebar_view": false,
      "sidebar_orderindex": null,
      "sidebar_num_subcats_between": null,
      "public_duplication_enabled": false,
      "grouped_orderindex": null,
      "auto_save": null,
      "hours_per_day": 8,
      "time_tracking_display_hours": true,
      "time_estimate_display_hours": true,
      "time_estimate_rollup": true,
      "time_tracking_rollup": true,
      "task_relationships": true,
      "template_options": null,
      "description": null,
      "counts": null,
      "view_access": true,
      "rectangle_logo": null,
      "used_count": null,
      "last_used": null,
      "id": "12zy6x-2182",
      "parent": {
        "id": "36698333",
        "type": 12
      },
      "dashboard": {
        "id": null,
        "name": null
      },
      "permissions": {
        "can_unprotect": true,
        "can_add_automation": true,
        "can_create_agents": true,
        "can_delete_comments": true,
        "can_edit_agents": true,
        "can_edit_vibeup_app": true,
        "can_edit_vibeup_chat": true,
        "can_view_agents": true,
        "can_view_vibeup_app": true,
        "can_view_vibeup_chat": true,
        "chat_add_followers": true,
        "chat_add_self_follower": true,
        "chat_comment": true,
        "chat_create_channel": true,
        "chat_delete_channel": true,
        "chat_manage_tiles": true,
        "chat_remove_followers": true,
        "chat_remove_members": true,
        "chat_remove_self_follower": true,
        "chat_reply": true,
        "comment": true,
        "create_automation": true,
        "create_private_view": true,
        "delete_view": true,
        "edit_view": true,
        "permission_level": 5,
        "can_edit_privacy": 2
      },
      "creator_user": {
        "id": 48763417,
        "username": "Peter Jaber",
        "email": "peterjaberau@gmail.com",
        "color": "#ea80fc",
        "initials": "PJ",
        "profilePicture": null
      },
      "members": [
        {
          "user": {
            "id": 48763417,
            "username": "Peter Jaber",
            "email": "peterjaberau@gmail.com",
            "color": "#ea80fc",
            "initials": "PJ",
            "date_joined": "1649012194525",
            "profilePicture": null
          },
          "role": 1,
          "role_subtype": 0,
          "role_key": "owner",
          "permission_level": 5,
          "permissions": {
            "can_add_automation": true,
            "can_create_agents": true,
            "can_delete_comments": true,
            "can_edit_agents": true,
            "can_edit_vibeup_app": true,
            "can_edit_vibeup_chat": true,
            "can_view_agents": true,
            "can_view_vibeup_app": true,
            "can_view_vibeup_chat": true,
            "chat_add_followers": true,
            "chat_add_self_follower": true,
            "chat_comment": true,
            "chat_create_channel": true,
            "chat_delete_channel": true,
            "chat_manage_tiles": true,
            "chat_remove_followers": true,
            "chat_remove_members": true,
            "chat_remove_self_follower": true,
            "chat_reply": true,
            "comment": true,
            "create_automation": true,
            "create_private_view": true,
            "delete_view": true,
            "edit_view": true
          }
        }
      ],
      "viewing": [],
      "commenting": [],
      "followers": [],
      "doc_settings": {
        "last_page": "12zy6x-542",
        "collapsed": [],
        "full_modal": false,
        "sidebar_open": true,
        "workspace_id": "36698333",
        "right_sidebar": 2
      },
      "avatar": {
        "value": null,
        "color": null,
        "attachment_id": null
      },
      "branding": {
        "rectangle_logo": null
      },
      "hierarchy_members": [],
      "hierarchy_group_members": [],
      "can_unfreeze_count": 0,
      "public_key": "ea2e515970fb8e9",
      "doc_type": 1,
      "group_members": []
    }
  },
  {
    "id": "f32d68d6-ba6e-4260-a725-0521836a9ac6",
    "type": 1,
    "draft": true,
    "orderindex": 5,
    "team_id": "36698333",
    "data": {
      "name": "",
      "tags": [],
      "team": "36698333",
      "points": null,
      "queued": false,
      "status": {
        "id": "p90030071122_p90100040393_p90100033322_p90100032799_p90100019733_p32279626_p63023836_gh8iOn7E",
        "type": "open",
        "color": "#87909e",
        "status": "Open",
        "orderindex": 0
      },
      "content": {
        "ops": [
          {
            "insert": "\n",
            "attributes": {
              "block-id": "block-b9821e7c-d5df-406d-b356-dce67670d39c"
            }
          }
        ]
      },
      "project": {
        "id": "90030071122",
        "name": "Professional Services"
      },
      "category": {
        "id": "90030231645",
        "name": "Wikido - Large Client Project",
        "project_id": "90030071122"
      },
      "due_date": null,
      "position": 12,
      "assignees": [
        48763417
      ],
      "followers": [
        48763417
      ],
      "isTimeout": false,
      "new_draft": false,
      "persisted": false,
      "checklists": [],
      "draft_uuid": "ae7cc3e1-d29b-4978-881f-77f0065c6f19",
      "start_date": null,
      "sync_state": "initial",
      "subcategory": {
        "id": "900300433032",
        "name": "Project Management",
        "category": "90030231645"
      },
      "customFields": [
        {
          "id": "f9352515-e68a-47df-bd9d-c4f19441b6c1",
          "name": "Spent",
          "role": 1,
          "type": "currency",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "1395930",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "f9352515-e68a-47df-bd9d-c4f19441b6c1",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "default": null,
            "precision": 2,
            "currency_type": "USD"
          },
          "date_created": "1674137202657",
          "order_column": "0",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "7b0fd151-7189-4e4d-b3fe-2e6704bd939c",
          "name": "Link to Opportunity",
          "role": 1,
          "type": "url",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "50701717",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "7b0fd151-7189-4e4d-b3fe-2e6704bd939c",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {},
          "date_created": "1674137202657",
          "order_column": "1",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "65b01c59-15e1-4ce0-90dd-9485cfe3edba",
          "name": "ACV",
          "role": 1,
          "type": "currency",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "12818833",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "65b01c59-15e1-4ce0-90dd-9485cfe3edba",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "precision": 2,
            "currency_type": "USD"
          },
          "date_created": "1674137202657",
          "order_column": "2",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "db269d58-b304-4dbf-ba85-56ce304de0be",
          "name": "CSM",
          "role": 1,
          "type": "users",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "50701717",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "db269d58-b304-4dbf-ba85-56ce304de0be",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "single_user": true,
            "include_groups": null,
            "include_guests": false,
            "include_team_members": false
          },
          "date_created": "1674137202657",
          "order_column": "3",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "ec15d54d-7cb2-40b4-80a7-fe60eecaceea",
          "name": "PMO Item Type",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "12818833",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "ec15d54d-7cb2-40b4-80a7-fe60eecaceea",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "options": [
              {
                "id": "d28a50e2-4803-4667-bdb9-b40cf13c3563",
                "name": "Portfolio",
                "type": "text",
                "color": "#7C4DFF",
                "value": "Portfolio",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "a1744947-9607-4197-a286-6aef841439ae",
                "name": "Program",
                "type": "text",
                "color": "#9b59b6",
                "value": "Program",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "cc7be754-7faa-470e-99df-abe95e79f76e",
                "name": "Project",
                "type": "text",
                "color": "#bf55ec",
                "value": "Project",
                "orderindex": 2,
                "workspace_id": "36698333"
              },
              {
                "id": "09f5b87e-65c1-46c5-978d-7ddb988e0b80",
                "name": "Project Team",
                "type": "text",
                "color": "#EA80FC",
                "value": "Project Team",
                "orderindex": 3,
                "workspace_id": "36698333"
              },
              {
                "id": "c771e3ed-fc7d-406e-95a2-ba66c05dd8cc",
                "name": "Change Request",
                "type": "text",
                "color": "#f9d900",
                "value": "Change Request",
                "orderindex": 4,
                "workspace_id": "36698333"
              },
              {
                "id": "2f40bda1-5096-4305-9d93-1b792a1042ab",
                "name": "Risk",
                "type": "text",
                "color": "#ff7800",
                "value": "Risk",
                "orderindex": 5,
                "workspace_id": "36698333"
              },
              {
                "id": "65e09373-52a8-4f77-b814-07c388a6d451",
                "name": "Issue",
                "type": "text",
                "color": "#e50000",
                "value": "Issue",
                "orderindex": 6,
                "workspace_id": "36698333"
              },
              {
                "id": "70f969bd-e385-41cd-bcfc-c1a2dfbae1b9",
                "name": "Retrospective",
                "type": "text",
                "color": "#0231E8",
                "value": "Retrospective",
                "orderindex": 7,
                "workspace_id": "36698333"
              },
              {
                "id": "247c964b-fdd0-49f9-9329-9efdc5e1950b",
                "name": "Status Report",
                "type": "text",
                "color": "#3082B7",
                "value": "Status Report",
                "orderindex": 8,
                "workspace_id": "36698333"
              },
              {
                "id": "ba24dde5-a845-4529-9b91-455c45e9b4ae",
                "name": "Milestone",
                "type": "text",
                "color": "#3397dd",
                "value": "Milestone",
                "orderindex": 9,
                "workspace_id": "36698333"
              },
              {
                "id": "857c061d-9fbf-4f9a-8599-82742fe131da",
                "name": "Task",
                "type": "text",
                "color": "#04A9F4",
                "value": "Task",
                "orderindex": 10,
                "workspace_id": "36698333"
              }
            ],
            "new_drop_down": true
          },
          "date_created": "1674137202657",
          "order_column": "4",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "5dacf306-18c4-41d8-9d9c-190f5931bad7",
          "name": "Sales Rep",
          "role": 1,
          "type": "users",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "50701717",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "5dacf306-18c4-41d8-9d9c-190f5931bad7",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "single_user": true,
            "include_groups": null,
            "include_guests": false,
            "include_team_members": false
          },
          "date_created": "1674137202657",
          "order_column": "5",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "025c572f-ad37-42ca-a68b-220d1f1c9671",
          "name": "Schedule",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "32272166",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "025c572f-ad37-42ca-a68b-220d1f1c9671",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "default": 0,
            "options": [
              {
                "id": "a511c531-104d-40b0-b731-5fa27ce5a009",
                "name": "On Track",
                "type": "text",
                "color": "#2ecd6f",
                "value": "On Track",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "dedb0b5f-d35d-440a-a0ec-e89d0b518488",
                "name": "At Risk",
                "type": "text",
                "color": "#f9d900",
                "value": "At Risk",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "4f41de9f-9694-4461-b348-18daf1bfe6f8",
                "name": "Off Track",
                "type": "text",
                "color": "#e50000",
                "value": "Off Track",
                "orderindex": 2,
                "workspace_id": "36698333"
              }
            ],
            "placeholder": null
          },
          "date_created": "1674137202657",
          "order_column": "6",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "2dcf8c5e-d738-4e52-83a7-b144f01d6df3",
          "name": "Budget",
          "role": 1,
          "type": "currency",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "1395930",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "2dcf8c5e-d738-4e52-83a7-b144f01d6df3",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "default": null,
            "precision": 2,
            "currency_type": "USD"
          },
          "date_created": "1674137202657",
          "order_column": "7",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "a9bf5062-70f0-4203-89f7-946c61889c9e",
          "name": "Segment",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "12818833",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "a9bf5062-70f0-4203-89f7-946c61889c9e",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "options": [
              {
                "id": "65c783f1-07e7-4869-bbdf-3e758802fe85",
                "name": "Strategic",
                "type": "text",
                "color": "#9b59b6",
                "value": "Strategic",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "c0ce09f2-b295-4e38-8cbb-c28ce9d37efe",
                "name": "Enterprise",
                "type": "text",
                "color": "#7C4DFF",
                "value": "Enterprise",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "cfd0808f-9bb3-4513-a3c3-ba107eae836b",
                "name": "Mid-Market",
                "type": "text",
                "color": "#3082B7",
                "value": "Mid-Market",
                "orderindex": 2,
                "workspace_id": "36698333"
              },
              {
                "id": "2b02f219-a018-4e53-8cc9-c3b6a9b786e3",
                "name": "SMB",
                "type": "text",
                "color": "#3397dd",
                "value": "SMB",
                "orderindex": 3,
                "workspace_id": "36698333"
              },
              {
                "id": "111a544e-c776-46c8-96c4-ec38b8ac9890",
                "name": "Micro",
                "type": "text",
                "color": "#81B1FF",
                "value": "Micro",
                "orderindex": 4,
                "workspace_id": "36698333"
              }
            ],
            "new_drop_down": true
          },
          "date_created": "1674137202657",
          "order_column": "8",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "eeebe47f-066b-4260-ac21-c28b7941ff49",
          "name": "Budget",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "32272166",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "eeebe47f-066b-4260-ac21-c28b7941ff49",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "default": 0,
            "options": [
              {
                "id": "4d8fc0de-9b8a-44ad-9e7f-ad0ae90f28b3",
                "name": "On Track",
                "type": "text",
                "color": "#2ecd6f",
                "value": "On Track",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "50e35620-51e5-4bff-b45e-7dbbfb7e351f",
                "name": "At Risk",
                "type": "text",
                "color": "#f9d900",
                "value": "At Risk",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "02bd344d-80a3-40f7-a837-c9e56031950d",
                "name": "Off Track",
                "type": "text",
                "color": "#e50000",
                "value": "Off Track",
                "orderindex": 2,
                "workspace_id": "36698333"
              }
            ],
            "placeholder": null,
            "new_drop_down": true
          },
          "date_created": "1674137202657",
          "order_column": "9",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": false
        },
        {
          "id": "ca2f3052-b14e-43f1-ac42-cc5f05c5839f",
          "name": "Project Health",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "50701717",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "ca2f3052-b14e-43f1-ac42-cc5f05c5839f",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "default": 0,
            "options": [
              {
                "id": "492e6e80-f7f6-4f7a-9081-a998707d0952",
                "name": "Off Track",
                "type": "text",
                "color": "#e50000",
                "value": "Off Track",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "aff78408-691a-4e2f-b8f8-522c87cdcd98",
                "name": "At Risk ",
                "type": "text",
                "color": "#f9d900",
                "value": "At Risk ",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "b7cae944-d6f2-40f1-a84e-e1285110fd30",
                "name": "On Track",
                "type": "text",
                "color": "#2ecd6f",
                "value": "On Track",
                "orderindex": 2,
                "workspace_id": "36698333"
              }
            ],
            "placeholder": null
          },
          "date_created": "1674137202657",
          "order_column": "10",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "85bcff0a-5408-4079-949c-fd2dadf9e8a9",
          "name": "Service Offering",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "12818833",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "85bcff0a-5408-4079-949c-fd2dadf9e8a9",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "options": [
              {
                "id": "08fc9d6a-ea74-4343-833d-811a51bc39a5",
                "name": "PreSale Scoping",
                "type": "text",
                "color": "#AF7E2E",
                "value": "PreSale Scoping",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "e4ca375c-320d-4498-8814-f066c51aaab6",
                "name": "Onboarding",
                "type": "text",
                "color": "#f9d900",
                "value": "Onboarding",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "7a8c1ed7-e2cd-4e4d-8fb8-12b1c2d829de",
                "name": "Integrations",
                "type": "text",
                "color": "#bf55ec",
                "value": "Integrations",
                "orderindex": 2,
                "workspace_id": "36698333"
              },
              {
                "id": "b94e7cb7-d645-4c9c-acb2-8aa770126f6d",
                "name": "Managed Services",
                "type": "text",
                "color": "#FF4081",
                "value": "Managed Services",
                "orderindex": 3,
                "workspace_id": "36698333"
              },
              {
                "id": "67c39bee-9f19-4869-926a-07a414e74d05",
                "name": "Training",
                "type": "text",
                "color": "#800000",
                "value": "Training",
                "orderindex": 4,
                "workspace_id": "36698333"
              }
            ],
            "new_drop_down": true
          },
          "date_created": "1674137202657",
          "order_column": "11",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "bfda7d78-ff27-4419-b6d2-3aad988e9e67",
          "name": "Stage",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "12818833",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "bfda7d78-ff27-4419-b6d2-3aad988e9e67",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "options": [
              {
                "id": "d5e85713-f181-41e8-9f90-95799fc9d5ff",
                "name": "🤝 PreSales",
                "type": "text",
                "color": "#fff",
                "value": "🤝 PreSales",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "fc3cf44f-eefb-4a0f-a439-9940341fa43b",
                "name": "👥 Resourcing",
                "type": "text",
                "color": null,
                "value": "👥 Resourcing",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "9ba206b8-7f09-4666-9835-043bb4e6ddbf",
                "name": "🥾 Kickoff",
                "type": "text",
                "color": null,
                "value": "🥾 Kickoff",
                "orderindex": 2,
                "workspace_id": "36698333"
              },
              {
                "id": "ea60308f-578e-40e2-800b-b37d3c41a1bb",
                "name": "🛠 Implementation",
                "type": "text",
                "color": null,
                "value": "🛠 Implementation",
                "orderindex": 3,
                "workspace_id": "36698333"
              },
              {
                "id": "b7a6bed5-1e78-4a80-8d03-f7640d1b6cf7",
                "name": "📄 Pre-Deployment",
                "type": "text",
                "color": null,
                "value": "📄 Pre-Deployment",
                "orderindex": 4,
                "workspace_id": "36698333"
              },
              {
                "id": "d3663eb0-8e14-4a48-894d-e83cf0bd168a",
                "name": "🏁 Deployment",
                "type": "text",
                "color": null,
                "value": "🏁 Deployment",
                "orderindex": 5,
                "workspace_id": "36698333"
              },
              {
                "id": "939c8b7d-ce0a-4547-a08e-f8162492209e",
                "name": "🆘 Post-Deployment Support",
                "type": "text",
                "color": null,
                "value": "🆘 Post-Deployment Support",
                "orderindex": 6,
                "workspace_id": "36698333"
              }
            ],
            "new_drop_down": true
          },
          "date_created": "1674137202657",
          "order_column": "12",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        },
        {
          "id": "4400a638-91eb-4cf0-928f-3a0819dd67e7",
          "name": "Scope",
          "role": 1,
          "type": "drop_down",
          "entity": {
            "id": "90030071122",
            "name": "Professional Services",
            "type": "project",
            "project_access": true
          },
          "pinned": false,
          "userid": "32272166",
          "deleted": false,
          "team_id": "36698333",
          "field_id": "4400a638-91eb-4cf0-928f-3a0819dd67e7",
          "required": false,
          "deleted_by": null,
          "values_set": null,
          "type_config": {
            "default": 0,
            "options": [
              {
                "id": "c11f07c8-0043-47b0-ba28-26757dc0895b",
                "name": "On Track",
                "type": "text",
                "color": "#2ecd6f",
                "value": "On Track",
                "orderindex": 0,
                "workspace_id": "36698333"
              },
              {
                "id": "d51a3327-ec90-4e93-8f15-6cc705eb3d2e",
                "name": "At Risk",
                "type": "text",
                "color": "#f9d900",
                "value": "At Risk",
                "orderindex": 1,
                "workspace_id": "36698333"
              },
              {
                "id": "102bfc5c-09cb-427f-b5e8-e9eb4c809306",
                "name": "Off Track",
                "type": "text",
                "color": "#e50000",
                "value": "Off Track",
                "orderindex": 2,
                "workspace_id": "36698333"
              }
            ],
            "placeholder": null
          },
          "date_created": "1674137202657",
          "order_column": "13",
          "inverted_field": false,
          "hide_from_guests": false,
          "required_on_subtasks": null
        }
      ],
      "dependencies": {
        "links": [],
        "blocked": [],
        "blockers": []
      },
      "time_estimate": null,
      "tab_orderindex": 0,
      "group_assignees": [],
      "group_followers": [],
      "relative_position": "bottom",
      "last_browser_change": 1701049118751
    }
  }
]

const favorites = {
  favorites: [
    {
      id: "fbdee125-601c-434f-9437-9c70863d9586",
      name: null,
      subcategory: {
        id: "901604908991",
        name: "AppMachine",
        avatar: null,
        custom_items_default: null,
        color: null,
      },
      sprint: false,
      orderindex: 1,
    },
  ],
}

const goal = {
  goals: [
    {
      id: "896fe918-be76-4ae3-99fe-b50fed930e27",
      pretty_id: "1",
      name: "goal1",
      team_id: "36698333",
      creator: 48763417,
      owner: null,
      color: "#757380",
      date_created: "1691243843278",
      start_date: null,
      due_date: "1691416799999",
      description:
        '{"ops":[{"insert":"test goal "},{"insert":"\\n","attributes":{"block-id":"block-6a8fb571-769e-4088-bd7f-988853f55799","list":{"list":"toggled","toggle-id":"list-ezvxyb"}}}]}',
      private: false,
      archived: false,
      multiple_owners: true,
      editor_token:
        "goal:896fe918-be76-4ae3-99fe-b50fed930e27:37775a08-6bb3-45c8-a338-c83bedf5963d:a7f14d34-d984-4049-92cd-779f36d770e4",
      date_updated: "1691243843278",
      last_update: "1691243868541",
      folder_id: null,
      role_subtype: 0,
      pinned: false,
      owners: [
        {
          id: 48763417,
          email: "peterjaberau@gmail.com",
          username: "Peter Jaber",
          color: "#ea80fc",
          profilePicture: null,
          initials: "P",
        },
      ],
      key_result_count: 1,
      members: [],
      group_members: [],
      percent_completed: 0,
    },
  ],
  folders: [],
}