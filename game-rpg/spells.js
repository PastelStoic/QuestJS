"use strict";


//-------  ELEMENTAL ATTACK SPELLS  -----------
// Spells that cause instant damage to the target


new Spell("Ice shard", {
  level:3,
  description:"A blast of frost power blasts your target.",
  tactical:"On a successful hit, target takes 3d6.",
  damage:'3d6',
  icon:'ice-shard',
  tooltip:"A shard of ice pierces your foe!",
  primarySuccess:"A shard of ice jumps from {nms:attacker:the} finger to {nm:target:the}!",
  modifyOutgoingAttack:function(attack) {
    attack.element = "frost";
  },
})

new Spell("Fireball", {
  noTarget:true,
  level:3,
  description:"A ball of fire engulfs the room.",
  tactical:"Targets all in the location except you; on a successful hit, target takes 2d6.",
  damage:'2d6',
  tooltip:"A fireball that fills the room (but does not affect you!)",
  primarySuccess:"{nv:target:reel:true} from the explosion.",
  primaryFailure:"{nv:target:ignore:true} it.",
  getPrimaryTargets:rpg.getAll,
  modifyOutgoingAttack:function(attack) {
    attack.element = "fire";
    attack.msg("The room is momentarily filled with fire.", 1)
  },
})

new Spell("Psi-blast", {
  level:5,
  description:"A blast of pure mental energy blasts your target.",
  tactical:"On a successful hit, target takes 3d6; ignores armour.",
  damage:'3d6',
  icon:'psi-blast',
  tooltip:"A blast of mental energy (ignores armour)",
  primarySuccess:"A blast of raw psi-energy sends {nm:target:the} reeling.",
  primaryFailure:"A blast of raw psi-energy... is barely noticed by {nm:target:the}.",
  modifyOutgoingAttack:function(attack) {
    attack.armourMultiplier = 0
  },
})

new Spell("Lightning bolt", {
  level:5,
  description:"A blast of lightning leaps to your target - and perhaps his comrades too.",
  tactical:"On a successful hit, target takes 3d6 and his allies take 2d6.",
  damage:'3d6',
  element:'storm',
  secondaryDamage:'2d6',
  icon:'lightning',
  tooltip:"A lightning bolt jumps from your out-reached hand to you foe!",
  primarySuccess:"A lightning bolt jumps from {nms:attacker:the} out-reached hand to {nm:target:the}!",
  secondarySuccess:"A smaller bolt jumps {nms:attacker:the} target to {nm:target:the}!",
  primaryFailure:"A lightning bolt jumps from {nms:attacker:the} out-reached hand to {nm:target:the}, fizzling out before it can actually do anything.",
  secondaryFailure:"A smaller bolt jumps {nms:attacker:the} target, but entirely misses {nm:target:the}!",
  getSecondaryTargets:rpg.getFoesBut,
  modifyOutgoingAttack:function(attack) {
    attack.element = "storm";
  },
  afterPrimaryFailure:function(attack) {
    attack.secondaryTargets = []
  },
})


//-------  ARMOUR SPELLS  -----------
// Spells that have an ongoing effect on attacks against the target


new Spell("Cursed armour", {
  level:3,
  description:"Can be cast on a foe to reduce the protection armour gives.",
  tactical:"Target loses 2 from their armour, to a minimum of zero.",
  primarySuccess:"{nms:target:the:true} armour is reduced.",
  incompatible:'magic armour',
  icon:'unarmour',
  effect:{
    modifyOutgoingAttack:function(attack) {
      attack.armourModifier = (attack.armourModifier > 2 ? attack.armourModifier - 2 : 0)
    },
  },
})


new SpellSelf("Stoneskin", {
  level:2,
  description:"Can be cast on yourself to give protection to all physical and many elemental attacks.",
  tactical:"Adds 2 to your armour.",
  primarySuccess:"Your skin becomes as hard as stone - and yet still just as flexible.",
  incompatible:'magic armour',
  effect:{
    modifyIncomingAttack:function(attack) {
      attack.armourModifier += 2
    },
  },
})

new SpellSelf("Steelskin", {
  level:4,
  description:"Can be cast on yourself to give protection to all physical and many elemental attacks.",
  tactical:"Adds 3 to your armour.",
  primarySuccess:"Your skin becomes as hard as steel - and yet still just as flexible.",
  duration:3,
  incompatible:'magic armour',
  effect:{
    modifyIncomingAttack:function(attack) {
      attack.armourModifier += 3
    },
  },
})




//-------  ATTACK-MODIFYING SPELLS  -----------
// Spells that have an ongoing effect on attacks made by the target


new SpellSelf("Strength", {
  level:3,
  description:"The target of this spell is made much stronger, able to do far more damage in non-magical attacks.",
  tactical:"Target will do twice the normal damage when making non-spell attacks",
  primarySuccess:"{nms:target:the:true} strength is enhanced.",
  incompatible:'enhancement',
  effect:{
    modifyOutgoingAttack:function(attack) {
      if (!attack.skill.spell) attack.damageModifier *= 2
    },
  },
})


new Spell("Weakness", {
  level:3,
  description:"The target of this spell is made much weaker, doing far less damage in non-magical attacks.",
  tactical:"Target will do half the normal damage when making non-spell attacks",
  primarySuccess:"{nms:target:the:true} strength is reduced.",
  incompatible:'enhancement',
  effect:{
    modifyOutgoingAttack:function(attack) {
      if (!attack.skill.spell) attack.damageModifier /= 2
    },
  },
})

new SpellSelf("Focus", {
  level:3,
  description:"The target of this spell can cast attack spells better.",
  tactical:"Gives a +3 bonus to attack rolls for spells.",
  primarySuccess:"{nms:target:the:true} mental acuity is enhanced.",
  incompatible:'enhancement',
  effect:{
    modifyOutgoingAttack:function(attack) {
      if (!attack.skill.spell) attack.offensiveBonus += 3
    },
  },
})


new Spell("Befuddle", {
  level:3,
  description:"The target of this spell will cast attack spells poorly.",
  tactical:"Gives a -3 penalty to attack rolls for spells.",
  primarySuccess:"{nms:target:the:true} mental acuity is reduced.",
  incompatible:'enhancement',
  effect:{
    modifyOutgoingAttack:function(attack) {
      if (!attack.skill.spell) attack.offensiveBonus -= 3
    },
  },
})





//-------  ENHANCING SPELLS  -----------
// These spells give the cast an ability, but only in terms of adding the active effect. It is up to authors
// to create the world so this is meaningful.



new SpellSelf("Lore", {
  level:2,
  description:"While this spell is active, you will gain new insights into items and creatures you look at.",
  primarySuccess:"You feel enlightened.",
  incompatible:'enhancements',
  effect:{},
})

new SpellSelf("Walk On Water", {
  level:2,
  description:"While this spell is active, you can walk on water!",
  primarySuccess:"You feel lighter.",
  incompatible:'enhancements',
  effect:{},
})

new SpellSelf("Featherfall", {
  level:2,
  description:"While this spell is active, you can fall from a great height without harm (as long as it is not into lava!).",
  primarySuccess:"You feel lighter.",
  incompatible:'enhancements',
  effect:{},
})







//-------  ELEMENTAL PROTECTION SPELLS  -----------
// These spells give the target protection (or vulnerability) to an element for a while



for (const el of ['Fire', 'Frost', 'Storm']) {
  new SpellSelf("Protection From " + el, {
    level:4,
    description:"Can be cast on yourself to give protection to all " + el + "-based attacks.",
    tactical:"Your take one third damage from all " + el + "-based attacks.",
    primarySuccess:"You take only a third damage from " + el.toLowerCase() + "-based attacks for six turns.",
    duration:6,
    incompatible:'protection',
    element:el.toLowerCase(),
    effect:{
      modifyIncomingAttack:function(attack) {
        if (attack.element !== this.element) return
        attack.damageMultiplier /= 3
      },
    },
  })

  new Spell("Vulnerability To " + el, {
    level:4,
    description:"Can be cast on a target to give vulnerability to all " + el + "-based attacks.",
    tactical:"Target takes three times damage from all " + el + "-based attacks.",
    primarySuccess:"Target takes triple damage from " + el.toLowerCase() + "-based attacks for six turns.",
    duration:6,
    incompatible:'protection',
    element:el.toLowerCase(),
    effect:{
      modifyIncomingAttack:function(attack) {
        if (attack.element !== this.element) return
        attack.damageMultiplier *= 3
      },
    },
  })

  new SpellSelf("Immunity To " + el, {
    level:4,
    description:"Can be cast on yourself to give immunity to all " + el + "-based attacks.",
    primarySuccess:"You take no damage from " + el.toLowerCase() + "-based attacks for six turns.",
    duration:6,
    incompatible:'protection',
    element:el.toLowerCase(),
    effect:{
      modifyIncomingAttack:function(attack) {
        if (attack.element !== this.element) return
        attack.damageMultiplier *= 0
      },
    },
  })

}







//-------  ELEMENTAL WEAPON ENHANCEMENTS  -----------
// Cast on a weapon to give it a bonus

new SpellInanimate("Earthmight Smasher", {
  level:2,
  description:"The Earthmight Smasher spell will temporarily enchant any crushing weapon to do extra Earthmight-based damage.",
  tactical:"Can be cast on any crushing weapon the player is holding. The weapon will then do Earthmight damage, and an additional 6 damage.",
  getTargets:function(attack) { return scopeReachable().filter(el => el.weaponType === 'crush' && el.loc === attack.attacker.name) },
  targetEffect:function(attack, item) {
    attack.msg(processText("{nm:item:the:true} now has earthmight pounding in it.", {item:item}), 1)
    item.activeEffects.push('Earthmight Smasher')
  },
  effect:{
    modifyOutgoingAttack:function(attack) {
      attack.element = "earthmight"
      attack.damageBonus += 6
    },
  },
  msgNoTarget:"You have no crush weapon for this spell.",
})


new SpellInanimate("Storm Bow", {
  level:2,
  description:"The Storm Bow spell will temporarily enchant any bow to do extra Storm-based damage.",
  tactical:"Can be cast on any bow the player is holding. The weapon will then do Storm damage, and an additional 6 damage.",
  getTargets:function(attack) { return scopeReachable().filter(el => el.weaponType === 'bow' && el.loc === attack.attacker.name) },
  targetEffect:function(attack, item) {
    attack.msg(processText("{nm:item:the:true} now fizzles with electrical energy.", {item:item}), 1)
    item.activeEffects.push('Storm Bow')
  },
  effect:{
    modifyOutgoingAttack:function(attack) {
      attack.element = "storm"
      attack.damageBonus += 6
    },
  },
  msgNoTarget:"You have no bow for this spell.",
})


new SpellInanimate("Ice Spear", {
  level:2,
  description:"The Ice Spear spell will temporarily enchant any polearm to do extra Fros-based damage.",
  tactical:"Can be cast on any polearm the player is holding. The weapon will then do frost damage, and the damage dice type will be increased by 3 (so a d6 will become d9).",
  getTargets:function(attack) { return scopeReachable().filter(el => el.weaponType === 'polearm' && el.loc === attack.attacker.name) },
  targetEffect:function(attack, item) {
    attack.msg(processText("{nm:item:the:true} has frost over it.", {item:item}), 1)
    item.activeEffects.push('Ice Spear')
  },
  effect:{
    modifyOutgoingAttack:function(attack) {
      attack.element = "frost"
      attack.damageSides += 3
    },
  },
  msgNoTarget:"You have no bow for this spell.",
})


new SpellInanimate("Flaming Blade", {
  level:2,
  description:"The Flaming Blade spell will temporarily enchant any bladed weapon to do extra Fire-based damage.",
  tactical:"Can be cast on any blade the player is holding. The weapon will then do fire damage, and the number of damage dice type will be increased by 1.",
  getTargets:function(attack) { return scopeReachable().filter(el => el.weaponType === 'blade' && el.loc === attack.attacker.name) },
  targetEffect:function(attack, item) {
    attack.msg(processText("{nm:item:the:true} now has fire along its blade.", {item:item}), 1)
    item.activeEffects.push('Flaming Blade')
  },
  effect:{
    modifyOutgoingAttack:function(attack) {
      attack.element = "fire"
      attack.damageNumber++
    },
  },
  msgNoTarget:"You have no bladed weapon for this spell.",
})





//-------  VISAGE SPELLS  -----------
// Change the player's appearance




new SpellSelf("Kobold Glamour", {
  level:1,
  description:"After casting this spell, the caster will resemble a kobold.",
  tactical:"Visage spells are purely visual - there is no change in the caster's stats or general size, and caster will not sound any different.",
  duration:5,
  visage:'kobold',
  regex:/kobold/,
  incompatible:'visage',
  effect:{
    start:function(target) {
      target.visage === this.visage
      return "{nv:target:have:true} now has a long, crocodilian snout, and green scales."
    },
    finish:function(target) {
      delete target.visage
      return "{nms:target:the:true} appearance returns to normal."
    },
  },
})









//-------  ENVIRONMENTAL SPELLS  -----------
// Affect inanimate items in the location

new SpellInanimate("Unlock", {
  level:2,
  description:"All locks in this location will unlock.",
  getTargets:function(attack) { 
    const list = w[attack.attacker.loc].getExits().filter(el => el.isLocked()) 
    for (const key in w) {
      if (w[key].isHere() && w[key].locked) list.push(w[key])
    }
    return list
  },
  targetEffect:function(attack, ex) {
    if (ex instanceof Exit) {
      attack.msg("The door to " + ex.nice() + " unlocks.", 1)
      ex.setLock(false)
    }
    else {
      attack.msg(processText("{nv:item:unlock:true}.", {item:ex}), 1)
      ex.locked = false
    }
  },
  msgNoTarget:"{nv:attacker:cast:true} the {i:{nm:skill}} spell, but there are no locked doors.",
})



new SpellInanimate("Unillusion", {
  level:2,
  description:"All illusions in this location will disappear.",
  automaticSuccess:true,
  getTargets:function(attack) { 
    const list = scopeHereParser().filter(el => el.unillusionable)
    if (currentLocation.unillusionable) list.push(currentLocation)
    return list
  },
  targetEffect:function(attack, ex) {
    ex.unillusion(attack)
  },
  msgNoTarget:"{nv:attacker:cast:true} the {i:{nm:skill}} spell, but there are no illusions here.",
})




new SpellSelf("Annulment", {
  icon:'annul',
  description:"Cancels all spell (and other) effects of the caster, good or bad.",
  targetEffect:function(attack) {
    if (attack.target.activeEffects.length === 0) {
      attack.msg("The {i:Annulment} spell has no effect - no effects to annul!")
      return
    }
    for (const el of attack.target.activeEffects) {
      const s = rpg.findEffect(el).terminate(attack.target)
      attack.msg(s)
    }
    return true
  },
})




new Spell("Commune with animal", {
  level:1,
  description:"Can be cast on any beast to allow the caster to talk to it for a limited time.",
  icon:'commune',
  regex:/commune/,
  duration:5,
  automaticSuccess:true,
  effect:{
    start:function(target) {
      return target.beast ? "{nv:attacker:can:true} now talk to {nm:target:the} for a short time." : "{nv:attacker:can:true} talk to {nm:target:the} for a short time (like before the spell...)."
    },
  },
})



new SpellSelf("Mage Light", {
  level:1,
  description:"The caster glows, illuminating the location.",
  duration:5,
  regex:/light/,
  automaticSuccess:true,
  effect:{
    start:function(target) {
      target.isLight = true
      return "{nv:target:be:true} shines brightly."
    },
    finish:function(target) {
      target.isLight = false
      return "{nv:target:stop:true} shining."
    },
  },
})




new SpellSelf("Way of the Merchant", {
  level:1,
  description:"The caster gains knowledge of how much items are worth and how much others are prepared to pay for them.",
  tactical:"Gives a +5 bonus to the trading skill.",
  duration:5,
  regex:/light/,
  automaticSuccess:true,
  effect:{
    start:function(target) {
      target.tradeSkill += 5
      return "{nv:target:be:true} gains trading skill."
    },
    finish:function(target) {
      target.tradeSkill -= 5
      return "{nv:target:stop:true} loses trading skill."
    },
  },
})




new SpellSummon("Summon Frost Elemental", {
  level:2,
  description:"Summons a lesser frost elemental; it will last about a minute, unless it is destroyed before then.",
  duration:6,
  prototype:'frost_elemental_prototype',
})







new SpellSelf("Returning", {
  icon:'moving',
  description:"Casting this spell instantly moves the caster to the location of the Stone of Returning.",
  item:'Stone_of_Returning',
  targetEffect:function(attack) {
    msg("The air swirls around you, and everything blurs...")
    rpg.teleport(attack.target, w[this.item].loc)
    return true
  },
  automaticSuccess:true,
})

new SpellSelf("Teleport", {
  icon:'moving',
  description:"Casting this spell instantly moves the caster to a location previously stored with the <i>Mark</i> spell.",
  targetEffect:function(attack) {
    if (!attack.target.activeTeleportLocation) {
      attack.msg("The {i:Teleport} spell has no effect - no location has been marked!")
      return
    }
    msg("The air swirls around you, and everything blurs...")
    rpg.teleport(attack.target, attack.target.activeTeleportLocation)
    return true
  },
  automaticSuccess:true,
})

new SpellSelf("Mark", {
  description:"Casting this spell marks a location for later use with the <i>Teleport</i> spell.",
  icon:'moving',
  targetEffect:function(attack) {
    attack.msg("This location is marked for future use.")
    attack.target.activeTeleportLocation = attack.target.loc
    return true
  },
  automaticSuccess:true,
})





/*

True sight
Darkness
Light
Utterdark
Utterlight
Invisibility
Shadows
Visage
Phantom
Darkvision
Utterdark vision
Fog



Summon weapon/shield

Merchant's tongue

Repel undead

Extinguish

Command

Befriend

Sleep

Beast form

Breathe under water

*/