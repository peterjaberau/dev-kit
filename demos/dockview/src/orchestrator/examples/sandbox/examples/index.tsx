

export const flowExamples: any = [
  {
    "id": "basic-demo",
    "name": "Basic Demo Flow",
    "version": "1.0.0",
    "description": "Simple user registration flow",
    "initialStep": "welcome",
    "context": {
      "user": null,
      "stepData": {},
      "errors": [],
      "ui": {
        "isLoading": false,
        "currentStep": "welcome"
      }
    },
    "actions": {
      "assignStepData": {
        "type": "assign",
        "target": "stepData",
        "value": "{{event.data}}"
      },
      "assignError": {
        "type": "assign",
        "target": "errors",
        "value": "{{event.error}}"
      },
      "logStep": {
        "type": "log",
        "message": "User completed step: {{event.step}}"
      }
    },
    "steps": [
      {
        "id": "welcome",
        "name": "Welcome to XFlows",
        "view": {
          "type": "display",
          "title": "Welcome to XFlows!",
          "subtitle": "React Demo Application",
          "message": "This demo showcases the complete XFlows framework with React integration, form handling, API calls, and state management.",
          "actions": [
            {
              "type": "button",
              "label": "Get Started",
              "event": "START_DEMO"
            }
          ]
        },
        "navigation": {
          "onNext": "user-info",
          "START_DEMO": "user-info"
        }
      },
      {
        "id": "user-info",
        "name": "User Information",
        "view": {
          "type": "form",
          "title": "User Information",
          "subtitle": "Tell us about yourself",
          "fields": [
            {
              "name": "firstName",
              "type": "text",
              "label": "First Name",
              "placeholder": "Enter your first name",
              "required": true,
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "lastName",
              "type": "text",
              "label": "Last Name",
              "placeholder": "Enter your last name",
              "required": true,
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "email",
              "type": "email",
              "label": "Email Address",
              "placeholder": "Enter your email",
              "required": true,
              "validation": {
                "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
              }
            }
          ],
          "actions": [
            {
              "type": "submit",
              "label": "Continue",
              "event": "SUBMIT_USER_INFO"
            },
            {
              "type": "button",
              "label": "Back",
              "event": "GO_BACK"
            }
          ]
        },
        "navigation": {
          "onNext": "preferences",
          "onBack": "welcome",
          "BACK": "welcome",
          "SUBMIT_USER_INFO": "preferences",
          "GO_BACK": "welcome"
        }
      },
      {
        "id": "preferences",
        "name": "Preferences",
        "view": {
          "type": "form",
          "title": "Preferences",
          "subtitle": "Customize your experience",
          "fields": [
            {
              "name": "theme",
              "type": "select",
              "label": "Theme Preference",
              "required": true,
              "options": [
                { "value": "light", "label": "Light" },
                { "value": "dark", "label": "Dark" },
                { "value": "auto", "label": "Auto" }
              ]
            },
            {
              "name": "notifications",
              "type": "checkbox",
              "label": "Enable Notifications",
              "required": false
            },
            {
              "name": "newsletter",
              "type": "checkbox",
              "label": "Subscribe to Newsletter",
              "required": false
            }
          ],
          "actions": [
            {
              "type": "submit",
              "label": "Save Preferences",
              "event": "SAVE_PREFERENCES"
            },
            {
              "type": "button",
              "label": "Back",
              "event": "GO_BACK"
            }
          ]
        },
        "navigation": {
          "onNext": "api-demo",
          "onBack": "user-info",
          "BACK": "user-info",
          "SAVE_PREFERENCES": "api-demo",
          "GO_BACK": "user-info"
        }
      },
      {
        "id": "api-demo",
        "name": "API Demo",
        "view": {
          "type": "display",
          "title": "API Integration Demo",
          "subtitle": "Simulating API call",
          "message": "This step demonstrates how XFlows handles async operations and API calls. Click the button to simulate an API request.",
          "actions": [
            {
              "type": "button",
              "label": "Simulate API Call",
              "event": "CALL_API"
            },
            {
              "type": "button",
              "label": "Back",
              "event": "GO_BACK"
            }
          ]
        },
        "hooks": {
          "after": [
            {
              "id": "simulate-api-call",
              "type": "delay",
              "duration": 2000,
              "onError": "ignore"
            }
          ]
        },
        "navigation": {
          "onNext": "complete",
          "onBack": "preferences",
          "BACK": "preferences",
          "CALL_API": "complete"
        }
      },
      {
        "id": "complete",
        "name": "Setup Complete",
        "view": {
          "type": "success",
          "title": "Demo Complete!",
          "subtitle": "XFlows React Integration",
          "message": "You've successfully completed the XFlows demo! This showcases form handling, state management, navigation, and API integration.",
          "actions": [
            {
              "type": "button",
              "label": "Start Over",
              "event": "RESTART_DEMO"
            }
          ]
        },
        "navigation": {
          "onNext": "welcome",
          "RESTART_DEMO": "welcome"
        }
      }
    ]

  },
  {
    "id": "ecommerce-checkout",
    "initial": "browse",
    "context": {
      "user": {
        "id": null,
        "email": null,
        "isLoggedIn": false
      },
      "cart": {
        "items": [],
        "total": 0,
        "currency": "EUR"
      },
      "payment": {
        "method": null,
        "details": {}
      },
      "shipping": {
        "address": {},
        "option": null,
        "cost": 0
      },
      "session": {
        "startTime": null,
        "lastActivity": null,
        "channel": "web"
      }
    },
    "states": {
      "browse": {
        "view": {
          "moduleId": "ProductCatalog",
          "slot": "main"
        },
        "on": {
          "ADD_TO_CART": {
            "target": "cart_updated",
            "actions": [{"type": "assign", "to": "cart.items", "fromEventPath": "item"}]
          },
          "VIEW_CART": "cart_review",
          "LOGIN_REQUEST": "user_login"
        }
      },
      "cart_updated": {
        "view": {
          "moduleId": "CartUpdate",
          "slot": "notification"
        },
        "on": {
          "CONTINUE_SHOPPING": "browse",
          "PROCEED_CHECKOUT": "cart_review"
        }
      },
      "cart_review": {
        "view": {
          "moduleId": "CartReview",
          "slot": "main"
        },
        "on": {
          "UPDATE_ITEM": "cart_review",
          "REMOVE_ITEM": "cart_review",
          "PROCEED_CHECKOUT": "login_check",
          "BACK_TO_BROWSE": "browse"
        }
      },
      "login_check": {
        "invoke": {
          "type": "user.service",
          "config": {"checkAuth": true}
        },
        "on": {
          "USER_AUTHENTICATED": "delivery_info",
          "USER_NOT_AUTHENTICATED": "user_login",
          "ERROR": "cart_review"
        }
      },
      "user_login": {
        "view": {
          "moduleId": "UserLogin",
          "slot": "modal"
        },
        "on": {
          "LOGIN_SUCCESS": "delivery_info",
          "LOGIN_SKIP": "guest_checkout",
          "LOGIN_ERROR": "user_login",
          "CANCEL_LOGIN": "cart_review"
        }
      },
      "guest_checkout": {
        "view": {
          "moduleId": "GuestCheckout",
          "slot": "main"
        },
        "on": {
          "PROVIDE_EMAIL": "delivery_info",
          "CANCEL": "cart_review"
        }
      },
      "delivery_info": {
        "view": {
          "moduleId": "DeliveryForm",
          "slot": "main"
        },
        "on": {
          "SAVE_DELIVERY": {
            "target": "shipping_options",
            "actions": [{"type": "assign", "to": "shipping.address", "fromEventPath": "address"}]
          },
          "USE_SAVED_ADDRESS": "shipping_options",
          "EDIT_CART": "cart_review"
        }
      },
      "shipping_options": {
        "invoke": {
          "type": "shipping.service",
          "config": {"calculateRates": true}
        },
        "view": {
          "moduleId": "ShippingOptions",
          "slot": "main"
        },
        "on": {
          "SELECT_SHIPPING": {
            "target": "payment_method",
            "actions": [
              {"type": "assign", "to": "shipping.option", "fromEventPath": "option"},
              {"type": "assign", "to": "shipping.cost", "fromEventPath": "cost"}
            ]
          },
          "EDIT_DELIVERY": "delivery_info",
          "ABANDON_CART": "session_timeout"
        }
      },
      "payment_method": {
        "view": {
          "moduleId": "PaymentMethods",
          "slot": "main"
        },
        "on": {
          "SELECT_PAYMENT": {
            "target": "payment_details",
            "actions": [{"type": "assign", "to": "payment.method", "fromEventPath": "method"}]
          },
          "EDIT_SHIPPING": "shipping_options",
          "SAVE_CARDT_PAYMENT": "secure_payment"
        }
      },
      "payment_details": {
        "view": {
          "moduleId": "PaymentForm",
          "slot": "main"
        },
        "on": {
          "SUBMIT_PAYMENT": {
            "target": "shipping_details",
            "actions": [{"type": "assign", "to": "payment.details", "fromEventPath": "details"}]
          },
          "CHANGE_PAYMENT_METHOD": "payment_method",
          "VALIDATION_ERROR": "payment_details"
        }
      },
      "secure_payment": {
        "invoke": {
          "type": "payment.service",
          "config": {"processPayment": true}
        },
        "view": {
          "moduleId": "PaymentProcessing",
          "slot": "main"
        },
        "on": {
          "PAYMENT_SUCCESS": "order_confirmation",
          "PAYMENT_FAILED": "payment_error",
          "PAYMENT_CANCELLED": "payment_method"
        }
      },
      "shipping_details": {
        "view": {
          "moduleId": "OrderSummary",
          "slot": "main"
        },
        "on": {
          "CONFIRM_ORDER": "secure_payment",
          "EDIT_ANYTHING": "cart_review"
        }
      },
      "order_confirmation": {
        "type": "final",
        "view": {
          "moduleId": "OrderSuccess",
          "slot": "main"
        }
      },
      "payment_error": {
        "view": {
          "moduleId": "PaymentError",
          "slot": "main"
        },
        "on": {
          "RETRY_PAYMENT": "payment_method",
          "CHANGE_PAYMENT": "payment_method",
          "CONTACT_SUPPORT": "support_request",
          "ABANDON": "session_timeout"
        }
      },
      "support_request": {
        "view": {
          "moduleId": "SupportForm",
          "slot": "modal"
        },
        "on": {
          "SUBMIT_SUPPORT": "support_success",
          "CANCEL_SUPPORT": "payment_error"
        }
      },
      "support_success": {
        "view": {
          "moduleId": "SupportConfirmation",
          "slot": "modal"
        },
        "on": {
          "CLOSE": "session_timeout"
        }
      },
      "session_timeout": {
        "type": "final",
        "view": {
          "moduleId": "SessionExpired",
          "slot": "main"
        }
      }
    }
  },
  {
    "id": "insurance-quote",
    "initial": "personal-info",
    "context": {
      "applicant": {
        "personal": {},
        "contact": {},
        "drivingHistory": {}
      },
      "vehicle": {
        "details": {},
        "safety": {}
      },
      "coverage": {
        "selectedOptions": {},
        "limits": {}
      },
      "quote": {
        "premiums": {},
        "breakdown": {}
      },
      "session": {
        "startTime": "",
        "riskIndex": 0
      },
      "errors": {}
    },
    "states": {
      "personal-info": {
        "view": {
          "moduleId": "applicant-form",
          "slot": "main-content"
        },
        "on": {
          "NEXT": {
            "target": "vehicle-info",
            "actions": [
              {
                "type": "assign",
                "to": "applicant.personal",
                "fromEventPath": "payload.personal"
              },
              {
                "type": "assign",
                "to": "applicant.contact",
                "fromEventPath": "payload.contact"
              },
              {
                "type": "track",
                "event": "Personal Info Submitted",
                "props": {
                  "step": "personal-info",
                  "hasPhone": "payload.contact.phone !== ''"
                }
              }
            ]
          }
        }
      },

      "vehicle-info": {
        "view": {
          "moduleId": "vehicle-form",
          "slot": "main-content"
        },
        "on": {
          "NEXT": {
            "target": "driving-history",
            "actions": [
              {
                "type": "assign",
                "degrees": "vehicle.details",
                "fromEventPath": "payload"
              }
            ]
          },
          "BACK": "personal-info"
        }
      },

      "driving-history": {
        "view": {
          "moduleId": "driving-history-form",
          "slot": "main-content"
        },
        "on": {
          "SUBMIT_HISTORY": {
            "target": "risk-assessment",
            "actions": [
              {
                "type": "assign",
                "to": "applicant.drivingHistory",
                "fromEventPath": "payload"
              },
              {
                "type": "track",
                "event": "Driving History Submitted",
                "props": {
                  "violationsCount": "payload.violations.length",
                  "accidentsCount": "payload.accidents.length"
                }
              }
            ]
          },
          "BACK": "vehicle-info"
        }
      },

      "risk-assessment": {
        "view": {
          "moduleId": "risk-assessment",
          "slot": "main-content"
        },
        "invoke": [
          {
            "id": "calculate-risk",
            "type": "risk-calculator",
            "config": {
              "applicantData": "{{context.applicant}}",
              "vehicleData": "{{context.vehicle}}",
              "drivingHistory": "{{context.applicant.drivingHistory}}"
            },
            "assignTo": "session.riskIndex"
          }
        ],
        "on": {
          "RISK_CALCULATED": {
            "target": "coverage-selection",
            "actions": [
              {
                "type": "track",
                "event": "Risk Assessment Complete",
                "props": {
                  "riskIndex": "{{context.session.riskIndex}}",
                  "riskLevel": "{{context.session.riskIndex > 0.7 ? 'high' : context.session.riskIndex > 0.4 ? 'medium' : 'low'}}"
                }
              }
            ]
          }
        },
        "onError": {
          "target": "error-state",
          "actions": [
            {
              "type": "assign",
              "to": "errors.riskAssessment",
              "fromEventPath": "error"
            }
          ]
        }
      },

      "coverage-selection": {
        "view": {
          "moduleId": "coverage-options",
          "slot": "main-content"
        },
        "on": {
          "COVERAGE_SELECTED": {
            "target": "quote-generation",
            "actions": [
              {
                "type": "assign",
                "to": "coverage.selectedOptions",
                "fromEventPath": "payload.coverage"
              },
              {
                "type": "assign",
                "to": "coverage.limits",
                "fromEventPath": "payload.limits"
              }
            ]
          },
          "BACK": "risk-assessment"
        }
      },

      "quote-generation": {
        "view": {
          "moduleId": "loading-quote",
          "slot": "main-content"
        },
        "invoke": [
          {
            "id": "generate-quote",
            "type": "quote-generator",
            "config": {
              "riskIndex": "{{context.session.riskIndex}}",
              "coverageOptions": "{{context.coverage.selectedOptions}}",
              "coverageLimits": "{{context.coverage.limits}}",
              "vehicleData": "{{context.vehicle}}",
              "applicantData": "{{context.applicant}}"
            },
            "assignTo": "quote.premiums"
          }
        ],
        "onDone": {
          "target": "quote-review",
          "actions": [
            {
              "type": "assign",
              "to": "quote.breakdown",
              "fromEventPath": "data"
            },
            {
              "type": "track",
              "event": "Quote Generated",
              "props": {
                "totalPremium": "{{data.totalPremium}}",
                "riskIndex": "{{context.session.riskIndex}}",
                "coverageTypes": "{{data.coverageTypes}}"
              }
            }
          ]
        },
        "onError": {
          "target": "quote-error",
          "actions": [
            {
              "type": "assign",
              "to": "errors.quoteGeneration",
              "fromEventPath": "error"
            }
          ]
        }
      },

      "quote-review": {
        "view": {
          "moduleId": "quote-summary",
          "slot": "main-content"
        },
        "on": {
          "ACCEPT_QUOTE": {
            "target": "payment-processing",
            "actions": [
              {
                "type": "track",
                "event": "Quote Accepted",
                "props": {
                  "finalPremium": "{{context.quote.premiums.total}}"
                }
              }
            ]
          },
          "MODIFY_COVERAGE": "coverage-selection",
          "START_OVER": "personal-info"
        }
      },

      "payment-processing": {
        "view": {
          "moduleId": "payment-form",
          "slot": "main-content"
        },
        "invoke": [
          {
            "id": "process-payment",
            "type": "payment-processor",
            "config": {
              "amount": "{{context.quote.premiums.total}}",
              "currency": "USD",
              "customerData": "{{context.applicanten}}"
            }
          }
        ],
        "onDone": {
          "target": "success",
          "actions": [
            {
              "type": "track",
              "event": "Payment Successful",
              "props": {
                "transactionId": "{{data.transactionId}}",
                "quoteId": "{{context.quote.id}}"
              }
            }
          ]
        },
        "onError": {
          "target": "payment-error",
          "actions": [
            {
              "type": "assign",
              "to": "errors.payment",
              "fromEventPath": "error"
            }
          ]
        }
      },

      "payment-error": {
        "view": {
          "moduleId": "payment-error",
          "slot": "main-content"
        },
        "on": {
          "RETRY_PAYMENT": "payment-processing",
          "MODIFY_PAYMENT": "quote-review",
          "CANCEL": "quote-review"
        }
      },

      "quote-error": {
        "view": {
          "moduleId": "quote-error",
          "slot": "main-content"
        },
        "on": {
          "RETRY": "quote-generation",
          "START_OVER": "personal-info"
        }
      },

      "error-state": {
        "view": {
          "moduleId": "generic-error",
          "slot": "main-content"
        },
        "on": {
          "RETRY": "risk-assessment",
          "START_OVER": "personal-info"
        }
      },

      "success": {
        "type": "final",
        "view": {
          "moduleId": "policy-confirmation",
          "slot": "main-content"
        }
      }
    }
  },
  {
    "id": "salesFlow",
    "initial": "quote.start",
    "context": {
      "session": {
        "channel": "web"
      },
      "quote": {},
      "errors": {}
    },
    "states": {
      "quote": {
        "initial": "start",
        "states": {
          "start": {
            "view": {
              "moduleId": "quote-start",
              "slot": "app"
            },
            "on": {
              "NEXT": "coverage"
            }
          },
          "coverage": {
            "view": {
              "moduleId": "coverage",
              "slot": "app"
            },
            "on": {
              "NEXT": "summary",
              "BACK": "#salesFlow.quote.start"
            }
          },
          "summary": {
            "view": {
              "moduleId": "summary",
              "slot": "app"
            },
            "on": {
              "CONFIRM": "#salesFlow.done",
              "BACK": "coverage"
            }
          }
        }
      },
      "done": {
        "type": "final"
      }
    }
  }
]
