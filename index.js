const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
console.log("heyo");
const PREFIX = '!';
const token = process.env.BOT_TOKEN;

const PLUSONES = [
    "Until end of turn, up to one target creature gets +1/+1 and gains first strike, vigilance, and lifelink.",
    "Distribute three +1/+1 counters among one, two, or three target creatures you control.",
    "Destroy target noncreature permanent.",
    "Create two 3/1 red Elemental creature tokens with haste. Exile them at the beginning of the next end step.",
    "Create three 1/1 white Soldier creature tokens.",
    "Create a 3/3 black Beast creature token with deathtouch.",
    "Reveal the top five cards of your library. Put all creature cards revealed this way into your hand and the rest on the bottom of your library in any order.",
    "During target opponent's next turn, creatures that player controls attack Urza if able.",
    "Put a loyalty counter on Urza for each creature target opponent controls.",
    "Until your next turn, whenever a creature an opponent controls attacks, it gets -1/-0 until end of turn.",
    "Target player exiles a card from their hand.",
    "Reveal the top card of your library. If it's a land card, put it onto the battlefield. Otherwise, put it into your hand.",
    "Target land you control becomes a 4/4 Elemental creature with trample. It's still a land.",
    "Draw a card, then add one mana of any color to your mana pool.",
    "Until end of turn, Urza becomes a legendary 4/4 red Dragon creature with flying, indestructible, and haste. (He doesn't lose loyalty while he's not a planeswalker.)",
    "Until your next turn, creatures you control get +1/+0 and gain lifelink.",
    "Look at the top five cards of your library. You may reveal an artifact card from among them and put it into your hand. Put the rest on the bottom of your library in any order.",
    "Urza deals 3 damage to any target.",
    "Until your next turn, whenever a creature deals combat damage to Urza, destroy that creature.",
    "Add X mana in any combination of colors to your mana pool, where X is the number of creatures you control.",
];

const MINUSONES = [
    "Urza deals 3 damage to each creature.",
    "Gain control of target creature.",
    "Urza deals 4 damage to any target and you gain 4 life.",
    "Destroy target creature. You gain life equal to its toughness.",
    "You get an emblem with “Creatures you control get +1/+1.”",
    "You may put a creature card from your hand onto the battlefield.",
    "Draw three cards, then put a card from your hand on top of your library.",
    "Target player puts the top ten cards of their library into their graveyard.",
    "Reveal the top five cards of your library. An opponent separates those cards into two piles. Put one pile into your hand and the other on the bottom of your library in any order.",
    "Exile target permanent.",
    "Reveal the top five cards of your library. You may put all creature cards and/or land cards from among them into your hand. Put the rest into your graveyard.",
    "Search your library for a card and put that card into your hand. Then shuffle your library.",
    "Target player sacrifices two creatures.",
    "Create a 5/5 black Demon creature token with flying. You lose 2 life.",
    "Create a 4/4 gold Dragon creature token with flying.",
    "Target player's life total becomes 10.",
    "Destroy target nonland permanent.",
    "Return target permanent from a graveyard to the battlefield under your control.",
    "Create two 3/3 green Beast creature tokens.",
    "Draw four cards and discard two cards.",
];

const MINUSSIXES = [
    "Urza deals 7 damage to target player. That player discards seven cards, then sacrifices seven permanents.",
    "You get an emblem with “If a source would deal damage to you or a planeswalker you control, prevent all but 1 of that damage.”",
    "Destroy all lands target player controls.",
    "Create X 2/2 white Cat creature tokens, where X is your life total.",
    "You gain 100 life.",
    "Urza deals 10 damage to target player and each creature they control.",
    "You get an emblem with “Creatures you control have double strike, trample, hexproof, and haste.”",
    "You get an emblem with “Artifacts, creatures, enchantments, and lands you control have indestructible.”",
    "Create a 6/6 green Wurm creature token for each land you control.",
    "Each player shuffles their hand and graveyard into their library. You draw seven cards.",
    "Destroy up to three target creatures and/or other planeswalkers. Return each card put into a graveyard this way to the battlefield under your control.",
    "You get an emblem with “Whenever you cast a spell, exile target permanent.”",
    "You get an emblem with “Whenever a creature enters the battlefield under your control, you may have it fight target creature.” Then create three 8/8 blue Octopus creature tokens.",
    "You control target player during that player's next turn.",
    "Exile all cards from target player's library, then that player shuffles their hand into their library.",
    "Create three 1/1 black Assassin creature tokens with “Whenever this creature deals combat damage to a player, that player loses the game.”",
    "Put all creature cards from all graveyards onto the battlefield under your control.",
    "You gain X life and draw X cards, where X is the number of lands you control.",
    "Flip five coins. Take an extra turn after this one for each coin that comes up heads.",
    "You gain 7 life, draw seven cards, then put up to seven permanent cards from your hand onto the battlefield.",
];

const MINUSTWELVES = [
    "Each opponent sacrifices one of their family members.",
    "Gain permanent ownership of target possession owned by target player.",
    "You get an emblem with \"Whenever an opponent concedes, that player can no longer play *Magic* for as long as they live.\"",
    "You control all players during all future *Magic* games.",
    "You get an emblem with \"You cannot lose the game and your opponents cannot win the game.\"",
    "All players play a *Dominion* subgame. Regardless of the outcome, when the game finishes, draw a card, gain 3 life, then you may put a land card from your hand onto the battlefield.",
    "Create four Doubling Season tokens. Exile all non-enchantment permanents you control, then return them to the battlefield.",
    "You get an emblem with \"Planeswalker abilities may be used as if you had not used a planeswalker ability this turn.\"",
    "You get an emblem with \"You may cast spells without paying their mana costs.\"",
];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content[0] !== PREFIX){
        return;
    }

    let args = msg.content.substring(PREFIX.length).split(' ');
    console.log(args);
    switch (args[0]){
        case "urza" :{
            urza(msg, args);
            break;
        }
        case "edhget":{
            edhget(msg);
            break;
        }
        default:{
            return;
        }
    }
 });

 function urza(msg, args){
     // we are calling Urza!
    let size = 0;

    switch(args[1]){
        case "+1":{
            var array = PLUSONES;
            size = PLUSONES.length;
            break;
        }
        case "-1":{
            var array = MINUSONES;
            size = MINUSONES.length;
            break;
        }
        case "-6":{
            var array = MINUSSIXES;
            size = MINUSSIXES.length;
            break;
        }
        case "-12":{
            var array = MINUSTWELVES;
            size = MINUSTWELVES.length;
            break;
        }
        case "edhget":{
            msg.reply("Urza sighs. \"*Feeling extra lucky today are we? Well here you go.*\"");
            edhget(msg);
            return;
        }
        default:{
            msg.reply("Urza furrows his brow. \"*I am not sure of what you ask, friend,*\" he says. Try using +1, -1 or -6 instead.");
            return;
        }
    }

    // get a random number from 0 to size-1
    let pick = Math.floor((Math.random() * size));
    if ( pick === size ) pick--;
    console.log(pick);
    console.log(array);
    if(array[pick]) msg.reply(array[pick]);
 }

 function edhget(msg){
    fs.readFile("decklinks", 'utf-8', function(error, data){
        if (error){
            msg.reply("I had an error opening the links file and it was "+error.message+"\nI feel bad and useless :(");
        }
        else{
            //data is a string we need to split up
            let links = data.split('\n');
            let length = links.length;
            let pick = Math.floor((Math.random() * length));
            if ( pick === length ) pick--;
            if (links[pick]){
                msg.reply("try playing "+links[pick]);
            }
            else{
                msg.reply("Oepsie doepsie.");
            }
        }
    });
 }

client.login(token);
