"use strict";

// Language support




const lang = {

  //----------------------------------------------------------------------------------------------
  // SUCCESSFUL Messages

  take_successful:function(char, item, count) {
    return lang.nounVerb(char, "take", true) + " " + item.byname({article:DEFINITE, count:count}) + ".";
  },
  drop_successful:function(char, item, count) {
    return lang.nounVerb(char, "drop", true) + " " + item.byname({article:DEFINITE, count:count}) + ".";
  },
  wear_successful:function(char, item) {
    return lang.nounVerb(char, "put", true) + " on " + item.byname({article:DEFINITE}) + ".";
  },
  remove_successful:function(char, item) {
    return lang.nounVerb(char, "take", true) + " " + item.byname({article:DEFINITE}) + " off.";
  },
  open_successful:function(char, item) {
    return lang.nounVerb(char, "open", true) + " " + item.byname({article:DEFINITE}) + ".";
  },
  close_successful:function(char, item) {
    return lang.nounVerb(char, "close", true) + " " + item.byname({article:DEFINITE}) + ".";
  },
  lock_successful:function(char, item) {
    return lang.nounVerb(char, "lock", true) + "k " + item.byname({article:DEFINITE}) + ".";
  },
  unlock_successful:function(char, item) {
    return lang.nounVerb(char, "unlock", true) + " " + item.byname({article:DEFINITE}) + ".";
  },
  fill_successful:function(char, item) {
    return lang.nounVerb(char, "fill", true) + " " + item.byname({article:DEFINITE}) + ".";
  },
  empty_successful:function(char, item) {
    return lang.nounVerb(char, "empty", true) + " " + item.byname({article:DEFINITE}) + ".";
  },
  turn_on_successful:function(char, item) {
    return lang.nounVerb(char, "switch", true) + " " + item.byname({article:DEFINITE}) + " on.";
  },
  turn_off_successful:function(char, item) {
    return lang.nounVerb(char, "switch", true) + " " + item.byname({article:DEFINITE}) + " off.";
  },
  sit_on_successful:function(char, item) {
    return lang.nounVerb(char, "sit", true) + " on " + item.byname({article:DEFINITE}) + ".";
  },
  stand_on_successful:function(char, item) {
    return lang.nounVerb(char, "stand", true) + " on " + item.byname({article:DEFINITE}) + ".";
  },
  recline_on_successful:function(char, item) {
    return lang.nounVerb(char, "lie", true) + " down on " + item.byname({article:DEFINITE}) + ".";
  },
  eat_successful:function(char, item) {
    return lang.nounVerb(char, "eat", true) + " " + item.byname({article:DEFINITE}) + ".";
  },
  drink_successful:function(char, item) {
    return lang.nounVerb(char, "drink", true) + " " + item.byname({article:DEFINITE}) + ".";
  },
  purchase_successful:function(char, item, amt) {
    return lang.nounVerb(char, "buy", true) + " " + item.byname({article:DEFINITE}) + " for " + displayMoney(amt) + ".";
  },
  sell_successful:function(char, item, amt) {
    return lang.nounVerb(char, "sell", true) + " " + item.byname({article:DEFINITE}) + " for " + displayMoney(amt) + ".";
  },
  push_exit_successful:function(char, item, dir, destRoom) {
    return lang.nounVerb(char, "push", true) + " " + item.byname({article:DEFINITE}) + " " + dir + ".";
  },

  npc_heading:function(char, dir) {
    return lang.nounVerb(char, "head", true) + " " + dir + ".";
  },





  //----------------------------------------------------------------------------------------------
  // Cannot Messages

  cannot_take:function(char, item) {
    return lang.nounVerb(char, "can't", true) + " take " + item.pronouns.objective + ".";
  },
  cannot_wear:function(char, item) {
    return lang.nounVerb(char, "can't", true) + " wear " + item.pronouns.objective + ".";
  },
  cannot_wear_ensemble:function(char, item) {
    return "Individual parts of an ensemble must be worn and removed separately.";
  },
  cannot_switch_on:function(char, item) {
    return lang.nounVerb(char, "can't", true) + " turn " + item.pronouns.objective + " on.";
  },
  cannot_switch_off:function(char, item) {
    return lang.nounVerb(char, "can't", true) + " turn " + item.pronouns.objective + " off.";
  },
  cannot_open:function(char, item) {
    return lang.nounVerb(item, "can't", true) + " be opened.";
  },
  cannot_close:function(char, item) {
    return lang.nounVerb(item, "can't", true) + " be closed.";
  },
  cannot_lock:function(char, item) {
    return lang.nounVerb(char, "can't", true) + "t lock " + item.pronouns.objective + ".";
  },
  cannot_unlock:function(char, item) {
    return lang.nounVerb(char, "can't", true) + " unlock " + item.pronouns.objective + ".";
  },
  cannot_read:function(char, item) {
    return "Nothing worth reading there.";
  },

  cannot_purchase:function(char, item) {
    return lang.nounVerb(char, "can't", true) + " buy " + item.pronouns.objective + ".";
  },
  cannot_purchase_here:function(char, item) {
    if (item.doNotClone && item.isAtLoc(char.name)) {
      return lang.nounVerb(char, "can't", true) + " buy " + item.byname({article:DEFINITE}) + " here - probably because " + lang.nounVerb(char, "be") + " already holding " + item.pronouns.objective + ".";
    }
    else {
      return lang.nounVerb(char, "can't", true) + " buy " + item.byname({article:DEFINITE}) + " here.";
    }
  },
  cannot_afford:function(char, item, amt) {
    return lang.nounVerb(char, "can't", true) + " afford " + item.byname({article:DEFINITE}) + " (need " + displayMoney(amt) + ").";
  },
  cannot_sell:function(char, item, amt) {
    return lang.nounVerb(char, "can't", true) + " sell " + item.pronouns.objective + ".";
  },
  cannot_sell_here:function(char, item, amt) {
    return lang.nounVerb(char, "can't", true) + " sell " + item.byname({article:DEFINITE}) + " here.";
  },

  cannot_use:function(char, item) {
    return "No obvious way to use " + item.pronouns.objective + ".";
  },
  cannot_smash:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can break.";
  },
  cannot_fill:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can fill.";
  },
  cannot_mix:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can mix liquids in.";
  },
  cannot_empty:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can empty.";
  },
  cannot_look_out:function(char, item) {
    lang.pronounVerb(char, "can't", true) + " look out of " + item.pronouns.objective + ".";
  },
  cannot_stand_on:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can stand on.";
  },
  cannot_sit_on:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can sit on.";
  },
  cannot_recline_on:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can lie on.";
  },

  cannot_eat:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can eat.";
  },
  cannot_drink:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can drink.";
  },
  cannot_ingest:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can ingest.";
  },
  cannot_push:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not something you can move around like that.";
  },
  cannot_push_up:function(char, item) {
    return lang.pronounVerb(char, "'be", true) + " not getting " + item.byname({article:DEFINITE}) + " up there!";
  },
  cannot_ask_about:function(char, item, text) {
    return "You can ask " + item.pronouns.objective + " about " + text + " all you like, but " + lang.pronounVerb(item, "'be") + " not about to reply.";
  },
  cannot_tell_about:function(char, item, text) {
    return "You can tell " + item.pronouns.objective + " about " + text + " all you like, but " + lang.pronounVerb(item, "'be") + " not interested.";
  },
  cannot_talk_to:function(char, item) {
    return "You chat to " + item.byname({article:DEFINITE}) + " for a few moments, before releasing that " + lang.pronounVerb(item, "'be") + " not about to reply.";
  },


  //----------------------------------------------------------------------------------------------
  // General command messages

  not_known_msg:"I don't even know where to begin with that.",
  disambig_msg:"Which do you mean?",
  no_multiples_msg:"You cannot use multiple objects with that command.",
  nothing_msg:"Nothing there to do that with.",
  general_obj_error:"So I kind of get what you want to do, but not what you want to do it with.",
  done_msg:"Done.",




  no_smell:function(char) {
    return lang.nounVerb(char, "can't", true) + " smell anything here.";
  },
  no_listen:function(char) {
    return lang.nounVerb(char, "can't", true) + " hear anything of note here.";
  },
  nothing_there:function(char) {
    return lang.nounVerb(char, "be", true) + " sure there's nothing there.";
  },
  nothing_inside:function(char) {
    return "There's nothing to see inside.";
  },
  not_that_way:function(char, dir) {
    return lang.nounVerb(char, "can't", true) + " go " + dir + ".";
  },
  object_unknown_msg:function(name) {
    return lang.nounVerb(game.player, "can't", true) + " see anything you might call '" + name + "' here.";
  },

  not_here:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not here.";
  },
  char_has_it:function(char, item) {
    return lang.nounVerb(char, "have", true) + " " + item.pronouns.objective + ".";
  },
  none_here:function(char, item) {
    return "There's no " + item.pluralAlias + " here.";
  },
  none_held:function(char, item) {
    return pronoun(char, "have", true) + " no " + item.pluralAlias + ".";
  },
  TAKE_not_push:function(char, item) {
    return "Just pick the thing up already!";
  },

  nothing_useful:function(char, item) {
    return "That's not going to do anything useful.";
  },
  already:function(item) {
    return sentenceCase(item.pronouns.subjective) + " already " + lang.conjugate (item, "be") + ".";
  },
  default_examine:function(char, item) {
    return lang.pronounVerb(item, "be", true) + " just your typical, every day " + item.byname() + ".";
  },
  no_topics:function(char, target) {
    return lang.nounVerb(char, "have", true) + " nothing to talk to " + target.byname({article:DEFINITE}) + " about.";
  },
  say_no_one_here:function(char, verb, text) {
    return lang.nounVerb(char, verb, true) + ", '" + sentenceCase(text) + ",' but no one notices.";
  },
  say_no_response:function(char, verb, text) {
    return "No one seemed interested in what you say.";
  },
  say_no_response_full:function(char, verb, text) {
    return lang.nounVerb(char, verb, true) + ", '" + sentenceCase(text) + ",' but no one seemed interested in what you say.";
  },
  
  container_recursion:function(char, container, item) {
    return "What? You want to put " + item.byname({article:DEFINITE}) + " in " + container.byname({article:DEFINITE}) + " when " + container.byname({article:DEFINITE}) + " is already in " + item.byname({article:DEFINITE}) + "? That's just too freaky for me.";
  },


  //----------------------------------------------------------------------------------------------
  // Specific command messages

  not_npc:function(item) {
    return lang.nounVerb(game.player, "can", true) + " tell " + item.byname({article:DEFINITE}) + " to do what you like, but there is no way " + lang.pronounVerb(item, "'ll") + " do it.";
  },
  not_npc_for_give:function(char, item) {
    return "Realistically, " + lang.nounVerb(item, "be") + " not interested in anything " + char.pronouns.subjective + " might give " + item.pronouns.objective + ".";
  },
  not_able_to_hear:function(char, item) {
    return "Doubtful " + lang.nounVerb(item, "will") + " be interested in anything " + char.pronouns.subjective + " has to say.";
  },
  not_container:function(char, item) {
    return sentenceCase(item.byname({article:DEFINITE})) + " is not a container.";
  },
  not_vessel:function(char, item) {
    return sentenceCase(item.byname({article:DEFINITE})) + " is not a vessel.";
  },

  not_carrying:function(char, item) {
    return lang.pronounVerb(char, "don't", true) + " have " + item.pronouns.objective + ".";
  },
  not_inside:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " not inside that.";
  },
  wearing:function(char, item) {
    return lang.pronounVerb(char, "'be", true) + " wearing " + item.pronouns.objective + ".";
  },
  not_wearing:function(char, item) {
    return lang.pronounVerb(char, "'be", true) + " not wearing " + item.pronouns.objective + ".";
  },
  cannot_wear_over:function(char, item, outer) {
    return lang.pronounVerb(char, "can't", true) + " put " + item.byname({article:INDEFINITE}) + " on over " + char.pronouns.poss_adj + " " + outer.byname() + ".";
  },
  cannot_remove_under:function(char, item, outer) {
    return lang.pronounVerb(char, "can't", true) + " take off " + char.pronouns.poss_adj + " " + item.byname() + " whilst wearing " + char.pronouns.poss_adj + " " + outer.byname() + ".";
  },
  already_have:function(char, item) {
    return lang.pronounVerb(char, "'ve", true) + " got " + item.pronouns.objective + " already.";
  },
  already_wearing:function(char, item) {
    return lang.pronounVerb(char, "'ve", true) + " already wearing " + item.pronouns.objective + ".";
  },
  cannot_take_component:function(char, item) {
    return lang.nounVerb(char, "can't", true) + " take " + item.pronouns.objective + "; " + lang.pronounVerb(item, "'be") + " part of " + w[item.loc].byname({article:DEFINITE}) + ".";
  },
  container_closed:function(char, item) {
    return lang.nounVerb(item, "be", true) + " closed.";
  },
  inside_container:function(char, item, cont) {
    return lang.pronounVerb(item, "be", true) + " inside " + cont.byname({article:DEFINITE}) + ".";
  },
  look_inside:function(char, item) {
    const l = formatList(item.getContents(display.LOOK), {article:INDEFINITE, lastJoiner:" and ", nothing:"nothing"});
    return "Inside " + item.byname({article:DEFINITE}) + " " + lang.pronounVerb(char, "can") + " see " + l + ".";
  },
  stop_posture:function(char) {
    if (!char.posture || char.posture === "standing") return "";
    let s;
    // You could split up sitting, standing and lying
    if (char.postureFurniture) {
      s = lang.nounVerb(char, "get", true) + " off " + w[char.postureFurniture].byname({article:DEFINITE}) + ".";
    }
    else {
      s = lang.nounVerb(char, "stand", true) + " up.";
    }
    char.posture = undefined;
    char.postureFurniture = undefined;
    return s;
  },
  can_go:function() {
    return "You think you can go {exits}."
  },



  //----------------------------------------------------------------------------------------------
  // NPC messages

  npc_nothing_to_say_about:function(char) {
    return lang.nounVerb(char, "have", true) + " nothing to say on the subject.";
  },
  npc_no_interest_in:function(char) {
    return lang.nounVerb(char, "have", true) + " no interest in that subject.";
  },



  // If the player does SPEAK TO MARY and Mary has some topics, this will be the menu title.
  speak_to_menu_title:function(char) {
    return "Talk to " + char.byname({article:DEFINITE}) + " about:";
  },
  // If the player does TELL MARY ABOUT HOUSE this will appear before the response.
  tell_about_intro:function(char, text) {
    return "You tell " + char.byname({article:DEFINITE}) + " about " + text + ".";
  },
  // If the player does ASK MARY ABOUT HOUSE this will appear before the response.
  ask_about_intro:function(char, text) {
    return "You ask " + char.byname({article:DEFINITE}) + " about " + text + ".";
  },



  //----------------------------------------------------------------------------------------------
  // Door and lock fails

  locked:function(char, item) {
    return lang.pronounVerb(item, "'be", true) + " locked.";
  },
  no_key:function(char, item) {
    return lang.nounVerb(char, "do", true) + " have the right key.";
  },
  locked_exit:function(char, exit) {
    return "That way is locked.";
  },
  open_and_enter:function(char, doorName) {
    return lang.nounVerb(char, "open", true) + " the " + doorName + " and walk through.";
  },
  unlock_and_enter:function(char, doorName) {
    return lang.nounVerb(char, "unlock", true) + " the " + doorName + ", open it and walk through.";
  },
  try_but_locked:function(char, doorName) {
    return lang.nounVerb(char, "try", true) + " the " + doorName + ", but it is locked.";
  },

  //----------------------------------------------------------------------------------------------
  // Misc

  list_and:" and ",
  list_nothing:"nothing",
  never_mind:"Never mind.",
  default_description:"It's just scenery.",
  click_to_continue:"Click to continue...",
  buy:"Buy", // used in the command link in the purchase table
  buy_headings:["Item", "Cost", ""],
  current_money:"Current money",
  nothing_for_sale:"Nothing for sale here.",
  wait_msg:"You wait one turn.",






  //----------------------------------------------------------------------------------------------
  // Save/load messages

  sl_dir_headings:"<tr><th>Filename</th><th>Ver</th><th>Timestamp</th><th>Comment</th></tr>",
  sl_dir_msg:"Ver is the version of the game that was being played when saved. Loading a save game from a different version may or may not work. You can delete a file with the DEL command.",
  sl_no_filename:"Trying to save with no filename",



  //----------------------------------------------------------------------------------------------


  article_filter_regex:/^(?:the |an |a )?(.+)$/,
  joiner_regex:/\,|\band\b/,
  all_regex:/^(all|everything)$/,
  all_exclude_regex:/^((all|everything) (but|bar|except)\b)/,
  go_pre_regex:"go to |goto |go |head |",


  //----------------------------------------------------------------------------------------------
  // Language constructs

  pronouns:{
    thirdperson:{subjective:"it", objective:"it", possessive: "its", poss_adj: "its", reflexive:"itself"},
    massnoun:{subjective:"it", objective:"it", possessive: "its", poss_adj: "its", reflexive:"itself"},
    male:{subjective:"he", objective:"him", possessive: "his", poss_adj: "his", reflexive:"himself"},
    female:{subjective:"she", objective:"her", possessive: "hers", poss_adj: "her", reflexive:"herself"},
    plural:{subjective:"they", objective:"them", possessive: "theirs", poss_adj: "their", reflexive:"themselves"},
    firstperson:{subjective:"I", objective:"me", possessive: "mine", poss_adj: "my", reflexive:"myself", possessive_name:'my'},
    secondperson:{subjective:"you", objective:"you", possessive: "yours", poss_adj: "your", reflexive:"yourself", possessive_name:'your'},
  },


  verbs:{
    examine:"Examine",
    use:"use",
    take:"Take",
    drop:"Drop",
    open:"Open",
    close:"Close",
    switchon:"Switch on",
    switchoff:"Switch off",
    wear:"Wear",
    remove:"Remove",
    lookat:"Look at",
    talkto:"Talk to",
    eat:"Eat",
    drink:"Drink",
    read:"Read",
  },


  // Change the abbrev values to suit your game (or language)
  // You may want to do that in settings, which is loaded first
  // One time we need var rather than const/let!
  exit_list:[
    {name:'northwest', abbrev:'NW', niceDir:"the northwest", key:103}, 
    {name:'north', abbrev:'N', niceDir:"the north", key:104}, 
    {name:'northeast', abbrev:'NE', niceDir:"the northeast", key:105}, 
    {name:'in', abbrev:'In', alt:'enter|i', niceDir:"inside"}, 
    {name:'up', abbrev:'U', niceDir:"above", key:107},
    
    {name:'west', abbrev:'W', niceDir:"the west", key:100}, 
    {name:'Look', abbrev:'Lk', nocmd:true, key:101}, 
    {name:'east', abbrev:'E', niceDir:"the east", key:102}, 
    {name:'out', abbrev:'Out', alt:'exit|o', niceDir:"outside"}, 
    {name:'down', abbrev:'Dn', alt:'d', niceDir:"below", key:109}, 

    {name:'southwest', abbrev:'SW', niceDir:"the southwest", key:97}, 
    {name:'south', abbrev:'S', niceDir:"the south", key:98}, 
    {name:'southeast', abbrev:'SE', niceDir:"the southeast", key:99}, 
    {name:'Wait', abbrev:'Z', nocmd:true, key:110}, 
    {name:'Help', abbrev:'?', nocmd:true}, 
  ],






  addDefiniteArticle:function(item) {
    if (item.defArticle) {
      return item.defArticle + " ";
    }
    return item.properName ? "" : "the ";
  },

  addIndefiniteArticle:function(item) {
    if (item.indefArticle) {
      return item.indefArticle + " ";
    }
    if (item.properName) {
      return "";
    }
    if (item.pronouns === lang.pronouns.plural) {
      return "some ";
    }
    if (item.pronouns === lang.pronouns.massnoun) {
      return "";
    }
    if (/^[aeiou]/i.test(item.alias)) {
      return "an ";
    }
    return "a ";
  },





  numberUnits:"zero;one;two;three;four;five;six;seven;eight;nine;ten;eleven;twelve;thirteen;fourteen;fifteen;sixteen;seventeen;eighteen;nineteen;twenty".split(";"),
  numberTens:"twenty;thirty;forty;fifty;sixty;seventy;eighty;ninety".split(";"),

  ordinalReplacements:[
    {regex:/one$/, replace:"first"},
    {regex:/two$/, replace:"second"},
    {regex:/three$/, replace:"third"},
    {regex:/five$/, replace:"fifth"},
    {regex:/eight$/, replace:"eighth"},
    {regex:/nine$/, replace:"ninth"},
    {regex:/twelve$/, replace:"twelfth"},
    {regex:/y$/, replace:"ieth"},
  ],

  toWords:function(number) {
    if (typeof number !== "number") {
      errormsg ("toWords can only handle numbers");
      return number;
    }
    
    let s = "";
    if (number < 0) {
      s = "minus ";
      number = -number;
    }
    if (number < 2000) {
      let hundreds = Math.floor(number / 100);
      number = number % 100;
      if (hundreds > 0) {
        s = s + lang.numberUnits[hundreds] + " hundred ";
        if (number > 0) {
          s = s + "and ";
        }
      }
      if (number < 20) {
        if (number !== 0 || s === "") {
          s = s + lang.numberUnits[number];
        }
      }
      else {
        let units = number % 10;
        let tens = Math.floor(number / 10) % 10;
        s = s + lang.numberTens[tens - 2];
        if (units !== 0) {
          s = s + lang.numberUnits[units];
        }
      }
    }
    else {
      s = "" + number;
    }
    return (s);
  },

  toOrdinal:function(number) {
    if (typeof number !== "number") {
      errormsg ("toWords can only handle numbers");
      return number;
    }
    
    let s = lang.toWords(number);
    for (let or of lang.ordinalReplacements) {
      if (or.regex.test(s)) {
        return s.replace(or.regex, or.replace);
      }
    }
    return (s + "th");
  },

  convertNumbers:function(s) {
    for (let i = 0; i < lang.numberUnits.length; i++) {
      let regex = new RegExp("\\b" + lang.numberUnits[i] + "\\b");
      if (regex.test(s)) s = s.replace(regex, "" + i);
    }
    return s;
  },



  contentsForSurface:function(contents) {
    return "with " + formatList(contents, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:this.name}) + " on it";
  },

  contentsForContainer:function(contents) {
    return "containing " + formatList(contents, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:this.name});
  },



  // Use when the NPC leaves a room; will give a message if the player can observe it
  npcLeavingMsg:function(npc, dest) {
    let s = "";
    let flag = false;
    if (w[game.player.loc].canViewLocs && w[game.player.loc].canViewLocs.includes(npc.loc)) {
      s = w[game.player.loc].canViewPrefix;
      flag = true;
    }
    if (flag || npc.here()) {
      s += lang.nounVerb(npc, "leave", !flag) + " " + w[npc.loc].byname({article:DEFINITE});
      const exit = w[npc.loc].findExit(dest);
      if (exit) s += ", heading " + exit.dir;
      s += ".";
      msg(s);
    }
  },


  niceDirections:function(dir) {
    const dirObj = lang.exit_list.find(function(el) { return el.name === dir; });
    return dirObj.niceDir ? dirObj.niceDir : dirObj.name;
  },
    

  // the NPC has already been moved, so npc.loc is the destination
  npcEnteringMsg:function(npc, origin) {
    let s = "";
    let flag = false;
    if (w[game.player.loc].canViewLocs && w[game.player.loc].canViewLocs.includes(npc.loc)) {
      // Can the player see the location the NPC enters, from another location?
      s = w[game.player.loc].canViewPrefix;
      flag = true;
    }
    if (flag || npc.here()) {
      s += lang.nounVerb(npc, "enter", !flag) + " " + w[npc.loc].byname({article:DEFINITE});
      const exit = w[npc.loc].findExit(origin);
      if (exit) s += " from " + lang.niceDirections(exit.dir);
      s += ".";
      msg(s);
    }
  },


  exitList:function() {
    const list = [];
    for (let exit of lang.exit_list) {
      if (game.room.hasExit(exit.name)) {
        list.push(exit.name);
      }
    }
    return list;
  },











  //----------------------------------------------------------------------------------------------
  // Conjugating



  conjugations:{
    i:[
      { name:"be", value:"am"},
      { name:"'be", value:"'m"},
    ],
    you:[
      { name:"be", value:"are"},
      { name:"'be", value:"'re"},
    ],
    we:[
      { name:"be", value:"are"},
      { name:"'be", value:"'re"},
    ],
    they:[
      { name:"be", value:"are"},
      { name:"'be", value:"'re"},
    ],
    it:[
      { name:"be", value:"is"},
      { name:"have", value:"has"},
      { name:"can", value:"can"},
      { name:"mould", value:"moulds"},
      { name:"*ould", value:"ould"},
      { name:"must", value:"must"},
      { name:"don't", value:"doesn't"},
      { name:"can't", value:"can't"},
      { name:"won't", value:"won't"},
      { name:"cannot", value:"cannot"},
      { name:"@n't", value:"n't"},
      { name:"'ve", value:"'s"},
      { name:"'be", value:"'s"},
      { name:"*ay", value:"ays"},
      { name:"*uy", value:"uys"},
      { name:"*oy", value:"oys"},
      { name:"*ey", value:"eys"},
      { name:"*y", value:"ies"},
      { name:"*ss", value:"sses"},
      { name:"*s", value:"sses"},
      { name:"*sh", value:"shes"},
      { name:"*ch", value:"ches"},
      { name:"*o", value:"oes"},
      { name:"*x", value:"xes"},
      { name:"*z", value:"zes"},
      { name:"*", value:"s"},
    ],
  },




  conjugate:function(item, verb) {
    let gender = item.pronouns.subjective;
    if (gender === "he" || gender === "she") { gender = "it"; }
    const arr = lang.conjugations[gender.toLowerCase()];

    if (!arr) {
      errormsg("No conjugations found: conjugations_" + gender.toLowerCase());
      return verb;
    }
    for (let conj of arr) {
      if (conj.name === verb) {
        return conj.value;
      }
    }
    
    for (let conj of arr) {
      const name = conj.name;
      const value = conj.value;
      if (name.startsWith("@") && verb.endsWith(name.substring(1))) {
        return lang.conjugate (item, verb.substring(0, verb.length - name.length + 1)) + value;
      }
      else if (name.startsWith("*") && verb.endsWith(name.substring(1))) {
        return item, verb.substring(0, verb.length - name.length + 1) + value;
      }
    }
    return verb;
  },


  pronounVerb:function(item, verb, capitalise) {
    let s = item.pronouns.subjective + " " + lang.conjugate (item, verb);
    s = s.replace(/ +\'/, "'");  // yes this is a hack!
    return capitalise ? sentenceCase(s) : s;
  },

  pronounVerbForGroup:function(item, verb, capitalise) {
    let s = item.groupPronouns().subjective + " " + lang.conjugate (item.group(), verb);
    s = s.replace(/ +\'/, "'");  // yes this is a hack!
    return capitalise ? sentenceCase(s) : s;
  },

  verbPronoun:function(item, verb, capitalise) {
    let s = lang.conjugate (item, verb) + " " + item.pronouns.subjective;
    s = s.replace(/ +\'/, "'");  // yes this is a hack!
    return capitalise ? sentenceCase(s) : s;
  },

  nounVerb:function(item, verb, capitalise) {
    if (item === game.player) {
      return lang.pronounVerb(item, verb, capitalise);
    }
    let s = item.byname({article:DEFINITE}) + " " + lang.conjugate (item, verb);
    s = s.replace(/ +\'/, "'");  // yes this is a hack!
    return capitalise ? sentenceCase(s) : s;
  },

  verbNoun:function(item, verb, capitalise) {
    if (item === game.player) {
      return lang.pronounVerb(item, verb, capitalise);
    }
    let s = lang.conjugate (item, verb) + " " + item.byname({article:DEFINITE});
    s = s.replace(/ +\'/, "'");  // yes this is a hack!
    return capitalise ? sentenceCase(s) : s;
  },






  //----------------------------------------------------------------------------------------------
  // Meta-messages

  helpScript:function() {
    if (TEXT_INPUT) {
      metamsg("Type commands in the command bar to interact with the world.");      
      metamsg("You can often just type the first few characters of an item's name and Quest will guess what you mean. You can use the up and down arrows to scroll back though your previous commands - especially useful if you realise you spelled something wrong.")
      metamsg("{b:Movement:} To move, use the eight compass directions (or just 'n', 'ne', etc.). Up/down and in/out may be options too. When \"Num Lock\" is on, you can use the number pad for all eight compass directions, and + and - for UP and DOWN.");
      metamsg("{b:Using items:} You can also LOOK, HELP or WAIT. Other commands are generally of the form GET HAT or PUT THE BLUE TEAPOT IN THE ANCIENT CHEST. Experiment and see what you can do!");
      metamsg("{b:Language: }You can use ALL and ALL BUT with some commands, for example TAKE ALL, and PUT ALL BUT SWORD IN SACK. You can also use pronouns, so LOOK AT MARY, then TALK TO HER. The pronoun will refer to the last subject in the last successful command, so after PUT HAT AND FUNNY STICK IN THE DRAWER, 'IT' will refer to the funny stick (the hat and the stick are subjects of the sentence, the drawer was the object).");
      metamsg("{b:Characters: }If you come across another character, you can ask him or her to do something. Try things like MARY,PUT THE HAT INTHE BOX, or TELL MARY TO GET ALL BUT THE KNIFE. Depending on the game you may be able to TALK TO a character, to ASK or TELL a character ABOUT a topic, or just SAY something and they will respond..");
    }
    if (PANES !== "None") {
      if (COMPASS) {
        metamsg("Use the compass rose at the top to move around. Click 'Lk' to look at you current location, 'Z' to wait or '?' for help.");
      }
      metamsg("To interact with an object, click on it, and a set of possible actions will appear under it. Click on the appropriate action.");
    }
    return SUCCESS_NO_TURNSCRIPTS;
  },

  aboutScript:function() {
    metamsg("{i:" + TITLE + " version " + VERSION + "} was written by " + AUTHOR + " using Quest 6.");
    if (THANKS.length > 0) {
      metamsg("Thanks to " + formatList(THANKS, {lastJoiner:list_and}) + ".");
    }
    return SUCCESS_NO_TURNSCRIPTS;
  },

  saveLoadScript:function() {
    metamsg("To save your progress, type SAVE followed by the name to save with.");
    metamsg("To load your game, refresh/reload this page in your browser, then type LOAD followed by the name you saved with.");
    metamsg("To see a list of save games, type DIR.");
    return SUCCESS_NO_TURNSCRIPTS;
  },

  transcriptScript:function() {
    metamsg("The TRANSCRIPT or SCRIPT command can be used to handle saving the input and output.");
    metamsg("Use SCRIPT ON to turn on recording and SCRIPT OFF to turn it off. Use SCRIPT SHOW to display it. To empty the file, use SCRIPT CLEAR.");
    metamsg("You can add options to the SCRIPT SHOW to hide various types of text. Use M to hide meta-information (like this), I to hide your input, P to hide parser errors (when the parser says it has no clue what you mean), E to hide programming errors and D to hide debugging messages. These can be combined, so SCRIPT SHOW ED will hide programming errors and debugging messages, and SCRIPT SHOW EDPID will show only the output game text.");
    metamsg("Everything gets saved to memory, and will be lost if you go to another web page or close your browser, but should be saved when you save your game. You can only have one transcript dialog window open at a time.");
    return SUCCESS_NO_TURNSCRIPTS;
  },

  topicsScript:function() {
    metamsg("Use TOPICS FOR [name] to see a list of topic suggestions to ask a character about (if implemented in this game).");
    return SUCCESS_NO_TURNSCRIPTS;
  },

  spoken_on:"Game mode is now 'spoken'. Type INTRO to hear the introductory text.",
  spoken_off:"Game mode is now 'unspoken'.",
  mode_brief:"Game mode is now 'brief'; no room descriptions (except with LOOK).",
  mode_terse:"Game mode is now 'terse'; room descriptions only shown on first entering and with LOOK.",
  mode_verbose:"Game mode is now 'verbose'; room descriptions shown every time you enter a room.",
  transcript_already_on:"Transcript is already turned on.",
  transcript_already_off:"Transcript is already turned off.",
  undo_disabled:"Sorry, UNDO is not enabled in this game.",
  undo_not_available:"There are no saved game-states to UNDO back to.",
  undo_done:"Undoing...",

};


// Most of the text processors are set up in text.js; these are te language specific ones.
const tp = {
  text_processors:{
    
    objects:function(arr, params) {
      const listOfOjects = scopeHereListed();
      return formatList(listOfOjects, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.loc});
    },
      
    exits:function(arr, params) {
      const list = lang.exitList();
      return formatList(list, {lastJoiner:" or ", nothing:"nowhere"});
    },

    exitsHere:function(arr, params) {
      const list = lang.exitList();
      return list.length === 0 ? "" : arr.join(":");
    },
    
  },
};










// Used by the editor
try { SUCCESS; }
catch (e) {
  module.exports = { EXITS: lang.exit_list, PRONOUNS: lang.pronouns }
}