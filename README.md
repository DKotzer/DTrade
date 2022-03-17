<br />
<div align="center">
  <a href="https://dkotzer.github.io/card-games/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">DCrypto</h3>

  <p align="center">
    Second Project for General Assembly SEI .

    <a href="https://github.com/DKotzer/DTrade/"><strong>Explore the docs »</strong></a>

    <!-- <a href="https://github.com/DKotzer/card-games">View Demo</a> -->
    ·
    <a href="https://github.com/DKotzer/DTrade/issues">Report Bug</a>
    ·
    <a href="https://github.com/DKotzer/DTrade/issues">Request Feature</a>

  </p>
</div>
<!-- ABOUT THE PROJECT -->

## General Overview

DCrypto is a practice trading app, or game, to practice/play at trading cryptocurrencies.
Every new account starts with 10,000 dollars USD of practice money and can buy/sell cryptocurrencies based on the current price on the Kraken trading platform.

You can play the visit the site by clicking [here].

<img src="images/homeScreen.png" width="800" style="border-radius:15px">
<br/><br/>

# :hearts: BlackJack :spades:

The rules are simple, the play is thrilling, and there is opportunity for high strategy. If you can count cards it is one of the only casino games that is in the players favour.

But even for the casual participant who plays a reasonably good game, Blackjack is one of the most attractive casino games from an odds perspective.

<img src="images/blackjackScreen.png" width="800" style="border-radius:15px">

This version of Blackjack has a card counting feature that allows you to practice your card counting skills. It also employs an insurance system if that dealer has Ace up on the flop - so you can incoproate that in to your practice as well.

## Object of the Game

The player attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.

If you run out of money you lose.

## Turn structure

1. Player places bet by clicking chips
2. Player starts the hand by pressing Deal
3. Player can choose to hit as long as they are below 21
4. When player is done hitting they can hit press stand to end their turn
5. Dealer will then stay if over 16 or hit until they reach above 16.
6. Whoever comes closer to 21 without going over wins. If both dealer and player have the same hand value it is a push/draw.

example turns :camera:

https://user-images.githubusercontent.com/34380246/155643322-248a41db-41ea-41e2-a31a-b9848a3c3e69.mp4

## Betting Rules

- Players start with an initial 1000 in their bank.
- A bet cannot go above the player bank total
- If the dealer has an Ace up after the initial deal players have the option to pay insurance, which costs one half the bet value.
- If the player has insurance and the dealer has blackjack, player gets 2x insurance back.
- The result of winning is 2x your bet
- The result of a push is getting your bet back.

# :clubs: WAR :diamonds:

The deck is divided evenly among the players, giving each a face down stack. In unison, each player reveals the top card of their deck—this is a "battle"—and the player with the higher card takes both of the cards played and moves them to their stack. Aces are high, and suits are ignored.

<img src="images/warScreen.png" width="800" style="border-radius:15px">

If the two cards played are of equal value, then there is a "war". Both players place the next three cards face down and then another card face-up. The winner of the war takes all the cards and puts them at the bottom of their deck.

:camera:

https://user-images.githubusercontent.com/34380246/155734479-0c1c0db3-b3f2-4d4f-a1cb-fdec77bdcd4e.mp4

If the face-up cards are again equal then the war repeats with another set of face-down/up cards. This repeats until one player's face-up card is higher than their opponent's.

## Object of the Game

The objective of the game is to win all of the cards.

## Turn structure

1. Click the deck

## Getting Started

### [Click here to play online](https://github.com/DKotzer/card-games)

### Installation

If you prefer to install the game on your machine for offline play you can clone the repo using the below code in your terminal of choice:

```sh
git clone git@github.com:DKotzer/card-games.git
```

## About The Project

For my first project at my software engineering bootcamp I am making a collection of card games. I will start with War, and Blackjack. After the boot camp I could potentially come back and add more games to the home page.

## Built With :hearts:

- JavaScript
- HTML
- CSS

<!-- ROADMAP -->

## Roadmap

- [ ] Finishing Touches on Blackjack
  - [ ] Fix the card counting function to work with multiple decks
  - [ ] Add in a button for the already existing choose deck size function
  - [ ] Add option to split hand
- [ ] Fix War
  - [ ] change cards to face down at bottom of deck after hand
  - [ ] remove shuffle
  - [ ] add notification modals
- [ ] Add a Poker game to the game room

See the [open issues](https://github.com/DKotzer/card-games/issues) for a full list of proposed features (and known issues).

## Original Plan

<img src="images/wire1.png" width="800" style="border-radius:15px">
<img src="images/wire2.png" width="800" style="border-radius:15px">
<img src="images/wire3.png" width="800" style="border-radius:15px">
<img src="images/wire4.png" width="800" style="border-radius:15px">

<!-- CONTACT -->

## Contact

Dylan Kotzer - [@DylanKotzer](https://twitter.com/DylanKotzer) - dylanKotzer@gmail.com

Project Link: [https://github.com/DKotzer/card-games](https://github.com/DKotzer/card-games)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-url]: https://www.linkedin.com/in/dylan-kotzer-3a5421190/
[product-screenshot]: images/screenshot.png
[here]: https://dcrypto-app.herokuapp.com/
