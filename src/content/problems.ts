import type { Problem } from '../types'

// Seeded from The Good Dog Handbook Part 3 problems. Urgency: safety highest.
export const problems: Problem[] = [
  {
    id: 'recall',
    name: 'Won’t come when called',
    urgency: 100,
    why: 'Coming back loses to the environment. Freedom is the jackpot, and the cue was never proofed at that level or got poisoned.',
    manage: [
      'Use a long line on a harness until recall is reliable.',
      'Fix the escape route and supervise outdoor time.',
      'Never punish him for coming back, even when he was naughty.',
    ],
    trains: ['come', 'touch', 'emergency-recall', 'collar-grab'],
    note: 'This is a safety issue, so it is trained first.',
  },
  {
    id: 'counter-surfing',
    name: 'Counter-surfing and stealing food',
    urgency: 80,
    why: 'The counter is a slot machine. One jackpot keeps him trying for weeks.',
    manage: [
      'Keep counters completely clear; wipe them down.',
      'During cooking, keep him out of reach: tether, pen, gate, or crate with a Kong.',
      'Send him to Place as the equipment-free boundary.',
    ],
    trains: ['place', 'leave-it', 'off'],
  },
  {
    id: 'stealing-objects',
    name: 'Stealing objects and pestering for attention',
    urgency: 60,
    why: 'Grab-and-run is usually about the reaction. Chasing him is the reward that keeps it going.',
    manage: [
      'Put the usual targets away: shoes, socks, remotes, kids’ toys.',
      'Stay boring, never chase; trade or call him to you.',
      'Give him a job (a chew or puzzle) when you cannot engage.',
    ],
    trains: ['drop-it', 'leave-it', 'come'],
  },
  {
    id: 'energy',
    name: 'Too much energy and no impulse control',
    urgency: 50,
    why: 'The crazy-dog behavior is unspent energy plus no self-control skills yet.',
    manage: [
      'Meet his needs first: real exercise, mental work, and enough rest.',
      'Capture calm constantly and feed meals out of puzzles.',
    ],
    trains: ['settle', 'leave-it', 'stay'],
    note: 'Pairs with the brain-games menu, which tires a dog faster than a walk.',
  },
  {
    id: 'manners',
    name: 'Jumping on people and pulling on leash',
    urgency: 40,
    why: 'Jumping is attention-seeking; pulling works, so it continues.',
    manage: [
      'Manage greetings with a leash or Place; reward four-on-the-floor.',
      'Ask visitors to ignore him until he is calm.',
    ],
    trains: ['off', 'sit', 'follow-me'],
  },
]
