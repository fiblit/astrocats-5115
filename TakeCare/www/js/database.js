var database =
{
  "persons" : {
    "Alice" : {
      "password" : "admin",
      "teams" : {
        "Martin's Care Team": {"own":false}
      }
    },
    "Jane" : {
      "password" : "admin",
      "teams" : {
        "Betty's Care Team" : {"own":true},
        "Charlie's Care Team" : {"own":false},
        "Linda's Care Team" : {"own":false}
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
    "Martin's Care Team" : {
      "owners" : [
          "Bertrand"
      ],
      "tasks" : [
        {"name": "Ride to Fairview Southdale",
        "time": 1480348031365,
        "location": "6401 France Ave S, Edina, MN 55435",
        "importance": "Urgent",
        "own":null,
        "description" : "Follow-up after chemo with Dr. Ringo... Shouldn’t be a long appointment, but sometimes they’re late getting him in."},
        {"name": "Long Walk with Daisy",
        "time": 1480348031365,
        "location": "anywhere!",
        "importance": "Helpful",
        "own":null,
        "description" : "Daisy hasn’t been for a hike in a month and she’s going a little stir crazy. If you could take her out for a long hike and run in the woods, it would make martin so happy!"},
        {"name": "Clean up before martin’s bday!",
        "time": 1480348031365,
        "location": "1234 Green Street, Minneapolis, MN 55443",
        "importance": "Helpful",
        "own":null,
        "description" : "Martin’s bday is on December 12, 2017, so we’re having a little party. Really need some help getting the house in order ahead of time… Would love some help with chores. Thanks so much!"}
      ],
      "updates" : [
        {"title": "Recovering after chemo! Things are looking up!",
        "time" : 1480347929365,
        "html": "<p>Martin’s feeling a lot better today. Last week was rough… 
        He had just received chemo, so lost his appetite and felt extremely weak. 
        Lots of time in bed.  The doctors told us yesterday that the tumors have 
        shrunk by 50%, so that helped a lot. Now he’s back on his feet, but there’s 
        still a lot to do around the house and Daisy just hasn’t been getting as 
        many long walks as she likes… We’re all tired, but we are so grateful for 
        all the help. We feel blessed to have you in our lives as we fight this 
        battle together.</p>"},
        {"title": "Going to get chemo next Thurs… It’s not going to be easy.",
        "time" : 1480347929365,
        "html": "<p>Martin received a diagnosis last week.</p><p> We just made this Care Team to try to find ways to help him out.</p>"},
      ]
    },

    "Charlie's Care Team" : {
      "owners" : [ 
        "Bertrand"  
      ],
      "tasks" :  [
        {"name": "Milk",
        "time": 1480349931365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "own": null,
        "description": "We need 2 tons of frozen milk ASAP"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Charlie makes updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    }

    "Linda's Care Team" : {
      "owners" : [ 
        "Bertrand"  
      ],
      "tasks" :  [
        {"name": "Milk",
        "time": 1480349931365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "own": null,
        "description": "We need 2 tons of frozen milk ASAP"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Charlie makes updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    }

    "Betty's Care Team" : {
      "owners" : [ 
        "Jane"  
      ],
      "tasks" :  [
        {"name": "Dinner prep on Tuesday",
        "time": 1480349931365,
        "location": "1234 Red Street, Minneapolis, MN 55443",
        "importance": "Helpful",
        "own": "Bertrand",
        "description": "We’d like some pizza, kthanks!"},
        {"name": "Childcare help",
        "time": 1480349931365,
        "location": "1234 Red Street, Minneapolis, MN 55443",
        "importance": "Helpful",
        "own": null,
        "description": "Betty’s kids would love to have someone come play with them and take them to the park. Thanks!"}
      ],
      "updates" : [
        {"title": "Betty’s going to make a complete recovery",
        "time" : 1480347929365,
        "html": "<p>The doctors told us that Betty is on track to be back to 100% after a few procedures.</p><p>We were so excited to hear this.</p>"}
      ]
    }


    "TeamCharilearoline" : {
      "owners" : [ 
        "Caroline"  
      ],
      "tasks" : [
        {"name": "Cookies",
        "time": 1480348031365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "own": "Dennis",
        "description": "We need 2 boxes of cookies"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Charilearoline make updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    },
    "TeamMartin" : {
      "owners" : [ 
        "Alice, Caroline"  
      ],
      "tasks" :  [
        {"name": "Brownies",
        "time": 1480349031365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "own": "Dennis",
        "description": "We need 2 boxes of brownies"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Martin make updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    },
    "TeamCharile" : {
      "owners" : [ 
        "Bertrand"  
      ],
      "tasks" :  [
        {"name": "Milk",
        "time": 1480349931365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "own": null,
        "description": "We need 2 tons of frozen milk ASAP"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Charile make updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    }
  }
};