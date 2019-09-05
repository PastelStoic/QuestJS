"use strict";

test.tests = function() {
  test.title("sentenceCase");
  
  test.assertEqual("Simple text", sentenceCase("simple text"));
  
  
  test.title("randomFromArray");
  const ary = ["one", "two", "three"];
  const ary2 = [];
  for (let i = 0; i < 3; i++) {
    const res = randomFromArray(ary, true);
    if (ary2.includes(res)) test.fail("ary2 already has that value");
    ary2.push(res);
  }
  test.assertEqual(0, ary.length);
  
  
  
  test.title("arrayCompare");
  test.assertEqual(false, arrayCompare([1, 2, 4, 6, 7], [1, 2, 3]));
  test.assertEqual(true, arrayCompare([1, 2, 4], [1, 2, 4]));
  test.assertEqual(false, arrayCompare([w.coin, w.boots, w.ring], [w.boots, w.ring]));
  test.assertEqual(true, arrayCompare([w.boots, w.ring], [w.boots, w.ring]));

  
  test.title("arraySubtract");
  test.assertEqual([4, 6, 7], arraySubtract([1, 2, 4, 6, 7], [1, 2, 3]));
  test.assertEqual(['4', '6', '7'], arraySubtract(['1', '2', '4', '6', '7'], ['1', '2', '3']));
  test.assertEqual([w.coin, w.boots], arraySubtract([w.coin, w.boots, w.ring], [w.ring]));
  

  test.title("Text processor");
  test.assertEqual("Simple text", processText("Simple text"));
  test.assertEqual("Simple <i>text</i>", processText("Simple {i:text}"));
  test.assertEqual("Simple <span style=\"color:red\">text</span>.", processText("Simple {colour:red:text}."));
  test.assertEqual("Simple <span style=\"color:red\">text with <i>nesting</i></span>.", processText("Simple {colour:red:text with {i:nesting}}."));
  test.assertEqual("Simple text", processText("Simple {random:text}"));
  test.assertEqual("Simple text: no", processText("Simple text: {if:player:someOddAtt:yes:no}"));
  game.player.someOddAtt = 67;
  test.assertEqual("Simple text: 67", processText("Simple text: {show:player:someOddAtt}"));
  test.assertEqual("Simple text: no", processText("Simple text: {if:player:someOddAtt:50:yes:no}"));
  test.assertEqual("Simple text: yes", processText("Simple text: {if:player:someOddAtt:67:yes:no}"));
  test.assertEqual("Simple text: ", processText("Simple text: {if:player:someOddAtt:50:yes}"));
  test.assertEqual("Simple text: yes", processText("Simple text: {if:player:someOddAtt:67:yes}"));
  test.assertEqual("Simple text: yes", processText("Simple text: {ifMoreThan:player:someOddAtt:50:yes:no}"));
  test.assertEqual("Simple text: no", processText("Simple text: {ifLessThan:player:someOddAtt:50:yes:no}"));
  test.assertEqual("Simple text: ", processText("Simple text: {ifLessThan:player:someOddAtt:50:yes}"));
  game.player.someOddAtt = true;
  test.assertEqual("Simple text: true", processText("Simple text: {show:player:someOddAtt}"));
  test.assertEqual("Simple text: yes", processText("Simple text: {if:player:someOddAtt:yes:no}"));
  test.assertEqual("Simple text: no", processText("Simple text: {ifNot:player:someOddAtt:yes:no}"));
  test.assertEqual("Simple text: seen first time only", processText("Simple text: {once:seen first time only}{notOnce:other times}"));
  test.assertEqual("Simple text: other times", processText("Simple text: {once:seen first time only}{notOnce:other times}"));
  test.assertEqual("Simple text: other times", processText("Simple text: {once:seen first time only}{notOnce:other times}"));
  test.assertEqual("Simple text: p2=red", processText("Simple text: p2={param:p2}", {p1:"yellow", p2:"red"}));

  
  test.title("Numbers");
  test.assertEqual("fourteen", toWords(14));
  test.assertEqual("minus four hundred and three", toWords(-403));
  test.assertEqual("ninetyseven", toWords(97));
  test.assertEqual("fourteenth", toOrdinal(14));
  test.assertEqual("four hundred and third", toOrdinal(403));
  test.assertEqual("ninetyfirst", toOrdinal(91));
  test.assertEqual("get 4 sticks", convertNumbers("get four sticks"));
  test.assertEqual("get 14 sticks", convertNumbers("get fourteen sticks"));
  test.assertEqual("get no sticks", convertNumbers("get no sticks"));
  test.assertEqual("ninetieth", toOrdinal(90));

  
  test.title("Numbers 2");
  test.assertEqual("(012,34)", displayNumber(1234, "(3,2)"));
  test.assertEqual("$1234", displayMoney(1234));
  test.assertEqual("$-1234", displayMoney(-1234));
  MONEY_FORMAT = "!3.2! credits"
  test.assertEqual("012.34 credits", displayMoney(1234));
  test.assertEqual("-012.34 credits", displayMoney(-1234));
  MONEY_FORMAT = "!+3.2! credits"
  test.assertEqual("+012.34 credits", displayMoney(1234));
  test.assertEqual("-012.34 credits", displayMoney(-1234));
  MONEY_FORMAT = game.moneyformat = "!$1,2!($1,2)!"
  test.assertEqual("$12,34", displayMoney(1234));
  test.assertEqual("($12,34)", displayMoney(-1234));
  

  test.title("getDir");
  test.assertEqual("out", getDir("o"));
  test.assertEqual("down", getDir("dn"));
  test.assertEqual("out", getDir("exit"));
  test.assertEqual(false, getDir("bo"));


  test.title("Look inside");
  test.assertCmd("look inside cabinet", "Inside the glass cabinet you can see a jewellery box and an ornate doll.");
  test.assertCmd("look inside box", "Inside the cardboard box you can see nothing.");
  test.assertCmd("look inside boots", "There's nothing to see inside.");
  test.assertCmd("look inside book", "The book has pages and pages of text, but you do not even recongise the text.");
  

  test.title("Simple object commands");
  test.assertCmd("i", "You are carrying a knife.");
  test.assertCmd("get coin", "You try to pick up the coin, but it just will not budge.");
  test.assertCmd("get straw boater", "Kyle has it.");
  test.assertCmd("get cabinet", "You can't take it.");
  test.assertCmd("get the cabinet", "You can't take it.");
  test.assertCmd("get a cabinet", "You can't take it.");
  test.assertCmd("get knife", "You have it.");
  test.assertCmd("x tv", "It's just scenery.");
  test.assertCmd("get tv", "You can't take it.");
  test.assertCmd("give knife to boots", "Realistically, the boots are not interested in anything you might give them.");


  test.title("Simple object commands (eat)");
  test.assertCmd("eat knife", "It's not something you can eat.");
  test.assertCmd("get sandwich", "You take the sandwich.");
  test.assertCmd("drink sandwich", "It's not something you can drink.");
  test.assertCmd("ingest sandwich", ["You eat the sandwich.", "That was Great!"]);

  
  test.title("Simple object commands (boots)");
  test.assertCmd("wear boots", "You don't have them.");
  test.assertCmd("remove boots", "You don't have them.");
  test.assertCmd("get boots", "You take the boots.");
  test.assertCmd("inv", "You are carrying some boots and a knife.");
  test.assertCmd("get boots", "You have them.");
  test.assertCmd("wear boots", "You put on the boots.");
  test.assertCmd("inventory", "You are carrying some boots (worn) and a knife.");
  test.assertCmd("wear boots", "You're wearing them.");
  test.assertCmd("remove boots", "You take the boots off.");
  test.assertCmd("drop boots", "You drop the boots.");
  
  
  test.title("Simple object commands (book)");
  test.assertCmd("get the book", "You take the book.");
  test.assertCmd("read the book", "It is not in a language you understand.");
  test.assertCmd("give it to kyle", "Done.");
  test.assertCmd("kyle, read the book", "It is not in a language he understands.");
  test.assertCmd("kyle, drop book", "Kyle drops the book.");
  test.assertCmd("n", "You can't go north.");
  test.assertCmd("d", "You can't go down.");


  test.title("Simple object commands (bricks)");
  test.assertCmd("get the bricks", "You take seven bricks.");
  test.assertCmd("drop 3 bricks", "You drop three bricks.");
  test.assertCmd("inv", "You are carrying four bricks and a knife.");
  test.assertCmd("drop 4 bricks", "You drop four bricks.");
  test.assertCmd("inv", "You are carrying a knife.");
  test.assertCmd("get 10 bricks", "You take seven bricks.");
  test.assertCmd("e", ["You head east.", "A clean room, a clock hanging on the wall.", "You can see a big kitchen table, a camera, a garage door and a trapdoor here.", "You can go north or west.", "A fresh smell here!"]);
  test.assertCmd("put 2 bricks on to the table", "Done.");
  test.assertCmd("inv", "You are carrying five bricks and a knife.");
  test.assertCmd("look", ["A clean room, a clock hanging on the wall.", "You can see a big kitchen table (with two bricks on it), a camera, a garage door and a trapdoor here.", "You can go north or west."]);
  test.assertCmd("get the bricks", "You take two bricks.");
  test.assertCmd("get clock", "You take the clock.");
  test.assertCmd("look", ["A clean room.", "You can see a big kitchen table, a camera, a garage door and a trapdoor here.", "You can go north or west."]);
  test.assertCmd("drop clock", "You drop the clock.");
  test.assertCmd("look", ["A clean room.", "You can see a big kitchen table, a camera, a clock, a garage door and a trapdoor here.", "You can go north or west."]);
  test.assertCmd("w", ["You head west.", "A smelly room with an old settee and a tv.", "You can see a book, some boots, a cardboard box, a coin, a flashlight, a garage key, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), Kyle (wearing a straw boater), a small key and a waterskin here.", "You can go east, south, up or west."]);
  

  test.title("Simple object commands (bricks and a box)");
  test.assertEqual(false, isContained(w.brick));
  test.assertCmd("drop bricks in box", "Done.");
  test.assertEqual(true, isContained(w.brick));
  test.assertCmd("get bricks", "You take seven bricks.");
  test.assertEqual(false, isContained(w.brick));  
  test.assertCmd("drop three bricks in box", "Done.");
  test.assertEqual(true, isContained(w.brick));
  test.assertCmd("drop bricks", "You drop four bricks.");
  test.assertEqual(true, isContained(w.brick));
  test.assertCmd("get bricks", "You take four bricks.");
  test.assertEqual(true, isContained(w.brick));
  test.assertCmd("get bricks", "You take three bricks.");
  test.assertEqual(false, isContained(w.brick));
  
  
  test.title("Simple object commands (bricks and a held box)");
  test.assertCmd("get box", "You take the cardboard box.");
  test.assertCmd("drop bricks in box", "Done.");
  test.assertCmd("get bricks from box", "Done.");
  test.assertCmd("drop three bricks in box", "Done.");
  test.assertCmd("drop bricks", "You drop four bricks.");
  test.assertCmd("get bricks", "You take four bricks.");
  test.assertCmd("get bricks", "You take three bricks.");
  test.assertCmd("drop box", "You drop the cardboard box.");
  

  test.title("Restricting");
  game.player.canTalk = function() { msg("You are gagged."); return false; }
  test.assertCmd("talk to kyle", "You are gagged.");
  game.player.canTalk = function() { return true; }
  game.player.canManipulate = function() { msg("You are handcuffed."); return false; }
  test.assertCmd("drop bricks", "You are handcuffed.");
  game.player.canManipulate = function() { return true; }
  test.assertCmd("drop bricks", "You drop seven bricks.");  
  
  
  test.title("Wear/remove");
  test.assertCmd("u", ["You head up.", "A large room, with a big bed and a wardrobe.", "You can see a coat, some jeans, a jumpsuit, a shirt, underwear and a wardrobe here.", "You can go down, in or west.",]);
  test.assertCmd("get all", ["Wardrobe: You can't take it.", "Underwear: You take the underwear.", "Jeans: You take the jeans.", "Shirt: You take the shirt.", "Coat: You take the coat.", "Jumpsuit: You take the jumpsuit.", ]);
  test.assertCmd("wear underwear", "You put on the underwear.");
  test.assertCmd("wear jeans", "You put on the jeans.");
  test.assertCmd("wear shirt", "You put on the shirt.");
  test.assertCmd("remove underwear", "You can't take off your underwear whilst wearing your jeans.");
  test.assertCmd("remove jeans", "You take the jeans off.");
  test.assertCmd("remove underwear", "You take the underwear off.");
  test.assertCmd("wear jumpsuit", "You can't put a jumpsuit on over your shirt.");
  test.assertCmd("remove shirt", "You take the shirt off.");  
  test.assertCmd("wear jumpsuit", "You put on the jumpsuit.");
  test.assertCmd("wear coat", "You put on the coat.");
  test.assertCmd("wear underwear", "You can't put underwear on over your jumpsuit.");
  test.assertCmd("remove coat", "You take the coat off.");  
  test.assertCmd("drop all", ["Knife: You drop the knife.", "Underwear: You drop the underwear.", "Jeans: You drop the jeans.", "Shirt: You drop the shirt.", "Coat: You drop the coat.", "Jumpsuit: You're wearing it.", ]);
  test.assertCmd("remove jumpsuit", "You take the jumpsuit off.");  
  test.assertCmd("drop jumpsuit", "You drop the jumpsuit.");  
  test.assertCmd("get knife", "You take the knife.");
  test.assertCmd("d", ["You head down.", "A smelly room with an old settee and a tv.", "You can see a book, some boots, seven bricks, a cardboard box, a coin, a flashlight, a garage key, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), Kyle (wearing a straw boater), a small key and a waterskin here.", "You can go east, south, up or west.",]);  

  
  test.title("NPC commands 1");
  test.assertCmd("w", ["You head west.", "An old-fashioned room.", "You can see a brick, a chair, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) and Lara here.", "You can go east, up or west.",]);  
  test.assertCmd("lara,get brick", "'I'm not picking up any bricks,' says Lara indignantly.");
  test.assertCmd("lara,e", "'I'm not going east,' says Lara indignantly. 'I don't like that room.'");
  test.menuResponseNumber = 1;
  test.assertEqual(2, w.Lara.getTopics().length);
  test.assertCmd("speak to lara", "You tell Lara she looks very attractive. 'Why thank you!' she replies, smiling at last.");
  test.assertEqual(1, w.Lara.getTopics().length);
  test.assertCmd("lara,sit on chair", ["Lara sits on the chair.", "The chair makes a strange noise when Lara sits on it."]);
  test.assertCmd("lara,stand up", "Lara gets off the chair.");
  test.assertCmd("lara,sit on chair", ["Lara sits on the chair.", "The chair makes a strange noise when Lara sits on it."]);
  
  test.assertCmd("l", ["An old-fashioned room.", "You can see a brick, a chair, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) and Lara (sitting on the chair) here.", "You can go east, up or west.",]);  
  
  w.Lara.canPosture = function() { msg("She is turned to stone."); return false; }
  test.assertCmd("lara, get off chair", "She is turned to stone.");
  w.Lara.canPosture = function() { return true; }
  test.assertCmd("lara, get off chair", "Lara gets off the chair.");
  test.assertCmd("lara,sit on chair", ["Lara sits on the chair.", "The chair makes a strange noise when Lara sits on it."]);
  test.assertCmd("lara,e", ["Lara gets off the chair.", "Lara heads east."]);
  test.assertCmd("e", ["You head east.", "A smelly room with an old settee and a tv.", "You can see a book, some boots, seven bricks, a cardboard box, a coin, a flashlight, a garage key, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), Kyle (wearing a straw boater), Lara, a small key and a waterskin here.", "You can go east, south, up or west.",]);
  test.assertCmd("lara,get boots", "Lara takes the boots.");
  test.assertCmd("lara,wear boots", "'I'm not doing that!' says Lara indignantly.");
  test.assertCmd("lara,drop boots", "Lara drops the boots.");
  test.assertCmd("lara,w", "Lara heads west.");
  
  
  test.title("NPC commands 2");
  test.assertCmd("boots,get coin", "You can tell the boots to do what you like, but there is no way they'll do it.");
  test.assertCmd("kyle,get coin", "He tries to pick up the coin, but it just will not budge.");
  test.assertCmd("kyle,get knife", "You have it.");
  test.assertCmd("kyle,get cabinet", "Kyle can't take it.");
  test.assertCmd("kyle,get cover", "Kyle can't take it; it's part of the book.");


  test.title("NPC commands (boots)");
  test.assertCmd("kyle, wear boots", "He doesn't have them.");
  test.assertCmd("kyle, remove boots", "He doesn't have them.");
  test.assertCmd("kyle, get boots", "Kyle takes the boots.");
  test.assertCmd("kyle, get boots", "Kyle has them.");
  test.assertCmd("kyle,give boots to box", "Realistically, the cardboard box is not interested in anything he might give it.");
  test.assertCmd("kyle, get boots", "Kyle has them.");
  test.assertCmd("kyle, wear boots", "Kyle puts on the boots.");
  test.assertCmd("kyle, wear boots", "He's wearing them.");
  test.assertCmd("kyle, remove boots", "Kyle takes the boots off.");
  test.assertCmd("kyle, put boots in box", "Done.");


  test.title("NPC commands (book)");
  test.assertCmd("tell kyle to get the book", "Kyle takes the book.");
  test.assertCmd("tell kyle to read the book", "It is not in a language he understands.");
  test.assertCmd("tell kyle to drop the book", "Kyle drops the book.");


  test.title("NPC commands (torch)");
  test.assertCmd("kyle, get torch", "Kyle takes the flashlight.");
  test.assertEqual(false, w.flashlight.switchedon);
  test.assertCmd("kyle, turn on the torch", "Kyle switches the flashlight on.");
  test.assertEqual(true, w.flashlight.switchedon);
  test.assertCmd("kyle, turn the torch off", "Kyle switches the flashlight off.");
  test.assertEqual(false, w.flashlight.switchedon);
  test.assertCmd("kyle, drop torch", "Kyle drops the flashlight.");


  test.title("NPC commands (go)");
  test.assertCmd("kyle, go ne", "Kyle can't go northeast.");
  test.assertCmd("kyle, go e", "Kyle heads east.");
  test.assertCmd("kyle, get torch", "You can't see anything you might call 'kyle' here.");
  test.assertCmd("get torch", "You take the flashlight.");
  test.assertCmd("get garage", "You take the garage key.");
  test.assertCmd("e", ["You head east.", "A clean room.", "You can see a big kitchen table, a camera, a clock, a garage door, Kyle (wearing a straw boater) and a trapdoor here.", "You can go north or west."]);
  test.assertCmd("kyle,n", "Kyle tries the garage door, but it is locked.");
  test.assertCmd("kyle,get all", ["Clock: Kyle takes the clock.", "Trapdoor: Kyle can't take it.", "Camera: Kyle takes the camera.", "Big_kitchen_table: Kyle can't take it.", "Garage_door: Kyle can't take it."]);
  test.assertCmd("kyle, drop picture box", "Kyle drops the camera.");
  test.assertCmd("kyle, open trapdoor", "Kyle opens the trapdoor.");
  test.assertCmd("kyle, down", "You watch Kyle disappear through the trapdoor.");


  test.title("The charger");
  test.assertCmd("open garage", ["You unlock the garage door.", "You open the garage door."]);
  test.assertCmd("n", ["An empty garage.", /You can see/, "You can go south."]);
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is closed.");
  test.assertCmd("push button", "You push the button, but nothing happens.");
  test.assertCmd("put torch in compartment", "The compartment is closed.");
  test.assertCmd("x compartment", "The compartment is just the right size for the torch. It is closed.");
  test.assertCmd("open compartment", "You open the compartment.");
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is empty.");
  test.assertCmd("x compartment", "The compartment is just the right size for the torch. It is open.");
  test.assertCmd("put torch in compartment", "Done.");
  test.assertCmd("put key in compartment", "The compartment is full.");
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment contains a flashlight.");
  test.assertCmd("push button", "You push the button, but nothing happens.");
  test.assertCmd("close compartment", "You close the compartment.");
  test.assertCmd("push button", "You push the button. There is a brief hum of power, and a flash.");
  test.assertCmd("get torch", "You can't see anything you might call 'torch' here.");
  test.assertCmd("open compartment", "You open the compartment.");
  test.assertCmd("get torch", "You take the flashlight.");
  test.assertCmd("open compartment", "It already is.");
  test.assertCmd("put knife in compartment", "Done.");
  test.assertCmd("close compartment", "You close the compartment.");
  test.assertCmd("push button", "There is a loud bang, and the knife is destroyed.");
  test.assertCmd("open compartment", "You open the compartment.");
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is empty.");
  

  test.title("Clone");
  const count = Object.keys(w).length;
  const clone = cloneObject(w.book);
  test.assertEqual(count + 1, Object.keys(w).length);
  test.assertEqual(w.book, clone.clonePrototype);
  test.assertEqual(w.book.examine, clone.examine);
  const clone2 = cloneObject(clone);
  test.assertEqual(count + 2, Object.keys(w).length);
  test.assertEqual(w.book, clone2.clonePrototype);
  test.assertEqual(w.book.examine, clone2.examine);

  
  test.title("Lock and hide");
  const room = w.far_away;
  test.assertEqual(true, room.hasExit("north"));
  test.assertEqual(true, room.hasExit("north", {excludeLocked:true}));
  test.assertEqual(false, room.setExitLock("northeast", true));
  test.assertEqual(true, room.setExitLock("north", true));
  test.assertEqual(false, room.hasExit("north", {excludeLocked:true}));
  test.assertEqual(true, room.hasExit("north"));
  room.templatePreSave();
  const landh = room.getSaveString();
  test.assertMatch(/customSaveExitnorth\:\"locked\/\"/, landh);
  room.setExitHide("north", true);
  room.setExitLock("north", false);
  room.templatePreSave();
  test.assertMatch(/customSaveExitnorth\:\"\/hidden\"/, room.getSaveString());
  saveLoad.setLoadString("far_away=" + landh);
  test.assertEqual(false, room.hasExit("north", {excludeLocked:true}));
  test.assertEqual(true, room.hasExit("north"));
  
  
  test.title("Save/Load");
  // Set up some changes to be saved
  w.boots.counter = 17;
  w.boots.unusualString = "Some interesting text";
  w.boots.notableFlag = true;
  w.boots.examine = "This will not get saved";
  w.book.mutableExamine = true;
  w.book.examine = "This WILL get saved";
  clone.cloneCounter = 29;
  const agendaCount = w.Arthur.agenda.length;
  test.assertEqual(0, w.Arthur.followers.length);
  const s = saveLoad.saveTheWorld("Comment!!!");
  // Now change them again, these changes should get over-written
  w.boots.counter = 42;
  w.boots.unusualString = "Some boring text";
  w.boots.notableFlag = false;
  w.boots.examine = "This will remain";
  w.book.examine = "This will not remain";
  const clone3 = cloneObject(clone);  // should not be there later
  saveLoad.loadTheWorld(s, 4);
  test.assertEqual(count + 2, Object.keys(w).length);
  test.assertEqual(17, w.boots.counter);
  test.assertEqual("Some interesting text", w.boots.unusualString);
  test.assertEqual(true, w.boots.notableFlag);
  test.assertEqual("This will remain", w.boots.examine);
  test.assertEqual("This WILL get saved", w.book.examine);
  test.assertEqual(agendaCount, w.Arthur.agenda.length);
  test.assertEqual(0, w.Arthur.followers.length);
  test.assertEqual(29, w[clone.name].cloneCounter);
  
  
  test.title("Path finding");
  test.assertEqual("lounge", formatList(agenda.findPath(w.dining_room, w.lounge)));
  test.assertEqual("", formatList(agenda.findPath(w.dining_room, w.dining_room)));
  test.assertEqual(null, agenda.findPath(w.dining_room, w.far_away));
  test.assertEqual("conservatory, dining room, lounge", formatList(agenda.findPath(w.garden, w.dining_room)));
  test.assertEqual(null, w.dining_room.findExit(w.far_away));
  test.assertEqual("east", w.dining_room.findExit(w.lounge).dir);
  test.assertCmd("s", ["A clean room.", /You can see/, "You can go down, north or west."]);
  test.assertCmd("w", ["You head west.", "A smelly room with an old settee and a tv.", /^You can see/, "You can go east, south, up or west."]);
  test.assertCmd("s", ["You head south.", "A light airy room.", /You can see/, "You can go north or west."]);
  test.assertCmd("w", ["You head west.", "Very overgrown.", "You can see Arthur here.", "You can go east."]);
  
  
  test.title("Agendas");
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'What?' he says, opening his eyes. 'Oh, it's you.'"]);
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'I am awake!'"]);
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur."]);
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'Stop it!'"]);
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'Stop it!'"]);
  test.assertEqual(0, w.Arthur.followers.length);
  test.assertCmd("z", ["You wait one turn.", "Arthur stands up and stretches."]);
  test.assertCmd("e", ["You head east.", "A light airy room.", /You can see/, "You can go north or west."]);
  test.assertEqual(0, w.Arthur.followers.length);
  test.assertCmd("z", ["You wait one turn.", "Arthur enters the conservatory from the east."]);
  test.assertCmd("n", ["You head north.", "A smelly room with an old settee and a tv.", /^You can see/, "You can go east, south, up or west.", "Arthur enters the lounge from the north."]);
  test.assertCmd("w", ["You head west.", "An old-fashioned room.", /^You can see/, "You can go east, up or west.", "Arthur enters the dining room from the west.", "'Hi, Lara,' says Arthur. 'Come look at the garden.'"]);  
  test.assertEqual(0, w.Arthur.followers.length);
  test.assertCmd("z", ["You wait one turn.", "'Sure,' says Lara."]);
  test.assertEqual(1, w.Arthur.followers.length);
  test.assertCmd("z", ["You wait one turn.", "Arthur and Lara leave the dining room, heading east."]);
  test.assertCmd("z", ["You wait one turn."]);
  test.assertCmd("z", ["You wait one turn.", "Through the window you can see Arthur and Lara enter the garden from the west.", "Through the window you see Arthur say something to Lara."]);
  
  
  test.title("Transit");
  test.assertCmd("w", ["You head west.", "A curious lift.", "You can see a Button: G, a Button: 1 and a Button: 2 here.", "You can go east."]);
  test.assertCmd("push button: g", ["You're already there mate!"]);
  test.assertCmd("push 1", ["You press the button; the door closes and the lift heads to the first floor. The door opens again."]);
  test.assertCmd("e", ["You head east.", "A large room, with a big bed and a wardrobe.", "You can see a coat, some jeans, a jumpsuit, a shirt, underwear and a wardrobe here.", "You can go down, in or west."]);
  test.assertCmd("w", ["You head west.", "A curious lift.", "You can see a Button: G, a Button: 1 and a Button: 2 here.", "You can go east."]);
  w.lift.transitOnMove = function(toLoc, fromLoc) { msg("MOVING to " + toLoc + " from " + fromLoc); };
  test.assertCmd("push 1", ["You press the button; nothing happens."]);
  test.assertCmd("push 2", ["That does nothing, the button does not work."]);
  test.assertCmd("push g", ["The old man presses the button....", "MOVING to dining_room from bedroom"]);
  test.assertCmd("e", ["You head east.", "An old-fashioned room.", /^You can see/, "You can go east, up or west."]);  
  w.lift.transitCheck = function() {
    msg("The lift is out of order");
    return false;
  };
  w.lift.transitAutoMove = true;
  w.lift.afterEnter = transitOfferMenu;
  test.assertCmd("w", ["You head west.", "A curious lift.", "You can see a Button: G, a Button: 1 and a Button: 2 here.", "You can go east.", "The lift is out of order", "An old-fashioned room.", "You can see a brick, a chair and a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) here.", "You can go east, up or west."]);
  
  
  test.title("Push");
  test.assertCmd("e", ["You head east.", "A smelly room with an old settee and a tv.", "You can see a book, a book, a book, seven bricks, a cardboard box (containing some boots), a coin, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), a small key and a waterskin here.", "You can go east, south, up or west."]);
  test.assertCmd("s", ["You head south.", "A light airy room.", "You can see a broken chair and a crate here.", "You can go north or west."]);
  test.assertCmd("push crate", "That's not going to do anything useful.");
  test.assertCmd("push chair s", "It's not something you can move around like that.");
  w.broken_chair.shift = function() { msg("You try to push chair, but it just breaks even more."); return false; }
  w.broken_chair.shiftable = true;
  test.assertCmd("push chair w", "You try to push chair, but it just breaks even more.");
  test.assertCmd("push crate s", "You can't go south.");
  test.assertCmd("push crate w", "You push the crate west.");
  
  
  test.title("ensemble");
  world.setRoom(game.player, "wardrobe", "suppress");
  test.assertCmd("l", ["Oddly empty of fantasy worlds.", "You can see a suit here.", "You can go out."]);
  test.assertCmd("get trousers", ["You take the suit trousers."]);
  test.assertCmd("l", ["Oddly empty of fantasy worlds.", "You can see a jacket and a waistcoat here.", "You can go out."]);
  test.assertCmd("i", ["You are carrying a flashlight, a garage key and some suit trousers."]);
  test.assertCmd("get jacket, waistcoat", ["Jacket: You take the jacket.", "Waistcoat: You take the waistcoat."]);
  test.assertCmd("i", ["You are carrying a flashlight, a garage key and a suit."]);
  test.assertCmd("drop suit", ["You drop the suit."]);
  test.assertCmd("get suit", ["You take the suit."]);
  test.assertCmd("wear xyz", ["Individual parts of an ensemble must be worn and removed separately."]);
  test.assertCmd("wear trousers", ["You put on the suit trousers."]);
  test.assertCmd("i", ["You are carrying a flashlight, a garage key, a jacket, some suit trousers (worn) and a waistcoat."]);
  test.assertCmd("wear jacket", ["You put on the jacket."]);
  test.assertCmd("wear waistcoat", ["You can't put a waistcoat on over your jacket."]);
  test.assertCmd("doff jacket", ["You take the jacket off."]);
  test.assertCmd("wear waistcoat", ["You put on the waistcoat."]);
  test.assertCmd("wear jacket", ["You put on the jacket."]);
  test.assertCmd("i", ["You are carrying a flashlight, a garage key and a suit (worn)."]);
  
};