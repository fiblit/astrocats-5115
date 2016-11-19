var database =
{
  "persons" : {
    "Alice" : {
      "password" : "admin",
      "teams" : {
        "TeamCharilearoline": {"own":false},
        "TeamMartin": {"own":true}
      }
    },
    "Bertrand" : {
      "password" : "admin",
      "teams" : {
        "TeamMartin": {"own":false},
        "TeamCharile": {"own":true}
      }
    },
    "Caroline" : {
      "password" : "admin",
      "teams" : {
        "TeamCharilearoline": {"own":true},
        "TeamMartin": {"own":true},
        "TeamCharile": {"own":false}
      }
    },
    "Dennis" : {
      "password" : "admin",
      "teams" : {
        "TeamCharilearoline": {"own":false}
      }
    }
  },
  "teams" : {
    "TeamCharilearoline" : {
      "owners" : [ 
        "Caroline"  
      ],
      "tasks" : {
        
      },
      "updates" : {     
      }
    },
    "TeamMartin" : {
      "owners" : [ 
        "Alice, Caroline"  
      ],
      "tasks" : {
      },
      "updates" : {
      }
    },
    "TeamCharile" : {
      "owners" : [ 
        "Bertrand"  
      ],
      "tasks" : {
      },
      "updates" : {
      }
    }
  }
};