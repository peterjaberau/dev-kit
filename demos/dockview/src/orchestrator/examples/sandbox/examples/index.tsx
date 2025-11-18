export const flowExamples: any = {
  basicDemo: {
    "id": "basicDemo",
    "name": "Basic Demo Flow",
    "version": "1.0.0",
    "description": "Simple user registration flow",
    "initialStep": "personal-info",
    "context": {
      "user": {},
      "errors": []
    },
    "steps": [
      {
        "id": "personal-info",
        "name": "Personal Information",
        "view": {
          "type": "form",
          "title": "Personal Information",
          "subtitle": "Please provide your basic information",
          "fields": [
            {
              "name": "firstName",
              "type": "text",
              "label": "First Name",
              "required": true,
              "placeholder": "Enter your first name",
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "lastName",
              "type": "text",
              "label": "Last Name",
              "required": true,
              "placeholder": "Enter your last name",
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "email",
              "type": "email",
              "label": "Email Address",
              "required": true,
              "placeholder": "Enter your email address"
            }
          ],
          "actions": [
            { "type": "submit", "label": "Continue", "event": "NEXT" },
            { "type": "button", "label": "Back", "event": "BACK" }
          ]
        },
        "hooks": {
          "after": [
            {
              "id": "save-personal-info",
              "type": "assign",
              "target": "user.personalInfo",
              "value": "{{event.data}}"
            }
          ]
        },
        "navigation": {
          "onNext": "verify-email",
          "onBack": "welcome"
        }
      },
      {
        "id": "verify-email",
        "name": "Email Verification",
        "view": {
          "type": "display",
          "title": "Verify Your Email",
          "message": "We've sent a verification link to {{context.user.personalInfo.email}}",
          "actions": [
            { "type": "button", "label": "Resend Email", "event": "RESEND" },
            { "type": "button", "label": "I've Verified", "event": "EMAIL_VERIFIED" },
            { "type": "button", "label": "Back", "event": "BACK" }
          ]
        },
        "invoke": {
          "id": "send-verification",
          "src": "httpClient",
          "input": {
            "endpoint": "/api/send-verification",
            "method": "POST",
            "body": "{{context.user.personalInfo.email}}"
          },
          "onDone": {
            "target": "verification-sent"
          },
          "onError": {
            "target": "error-step"
          }
        },
        "navigation": {
          "onNext": "success",
          "onBack": "personal-info"
        }
      },
      {
        "id": "success",
        "name": "Registration Complete",
        "view": {
          "type": "success",
          "title": "Registration Complete!",
          "message": "Welcome to our platform!",
          "template": "Hello {{context.user.personalInfo.firstName}}!",
          "actions": [
            { "type": "button", "label": "Continue", "event": "NEXT" }
          ]
        }
      }
    ]
  },
  ecommerceCheckout: {
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
  insuranceQuote: {
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
  salesFlow: {
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
}
