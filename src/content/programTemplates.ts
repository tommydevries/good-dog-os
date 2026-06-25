import type { CommandId } from '../types'

// Foundation teaching order. The engine sequences selected commands along this.
export const teachingOrder: CommandId[] = [
  'name',
  'sit',
  'down',
  'leave-it',
  'off',
  'place',
  'stay',
  'drop-it',
  'come',
  'touch',
  'collar-grab',
  'emergency-recall',
  'settle',
  'follow-me',
]

// End-of-week milestone shown when a command is the week's headline skill.
export const milestones: Record<CommandId, string> = {
  name: 'Responds to his name instantly in a quiet room.',
  sit: 'Sits on the first cue and holds until released.',
  down: 'Downs on cue and holds it.',
  'leave-it': 'Leaves a treat in your open palm on cue.',
  off: 'Gets off for four-on-the-floor without a fuss.',
  place: 'Holds Place on cue for 30 seconds, then through a dinner prep.',
  stay: 'Holds a one-minute stay while you cross the room.',
  'drop-it': 'Trades an object for a treat without a chase.',
  come: 'Comes running from another room every time.',
  touch: 'Drives to your hand on the first cue, with distractions.',
  'collar-grab': 'Leans into your hand when you reach for the collar.',
  'emergency-recall': 'Turns on a dime to the emergency word.',
  settle: 'Settles on his mat while the household carries on.',
  'follow-me': 'Keeps the leash loose and checks in on a walk.',
}
