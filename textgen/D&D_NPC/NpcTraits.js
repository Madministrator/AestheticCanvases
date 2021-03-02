const npcTraits = `
- for reference, any line which starts with a hyphen is treated as a comment

#template:
<a> |gender| |race| catches your eye. They are [tall, small, average height] for their race, and most noticably they have <a> |distinguishing feature|.
You see <a> |race| named |name|, who is <a> |player class|
Sitting across from you at the table you see <a> |race| |gender|; the most interesting part about their appearance is that they have <a> |distinguishing feature|.
Standing out from the others around you there is a |gender| |race| cleric. Dangling from their neck is a holy symbol, a flat metal disk which has been stamped with the symbol of |diety|.

#alignment:
lawful good
neutral good
chaotic good
lawful neutral
neutral
chaotic neutral
lawful evil
neutral evil
chaotic evil

#race:
dwarf
elf
halfling
human
|dragon color| dragonborn
gnome
half-elf
half-orc
tiefling

#player class:
barbarian
bard
cleric
druid
fighter
monk
paladin
ranger
rogue
sorcerer
warlock
wizard

#gender:
male
female
- TODO: add more genders, but somehow have them be grammatically correct.
- I can say "Elf male" not "Elf nonbinary" and still make sense in a sentance.

#dragon color:
red
blue
green
white
black
gold
silver
copper
brass
bronze

#distinguishing feature:
scar that runs from their chin to their left ear, crossing their lips in such a way as to give them a permanent scowl
prosthetic limb which replaces their [left, right] leg
hook for a [left, right] hand
birthmark that stretches up their entire [left, right] arm
burn scar which covers their left eye, leaving them with a squint on that side
eyepatch covers their [left, right] eye
tattoo of <a> |tattoo|
faint smell of decay about them
long glorious beard that reaches their waist
missing tooth which doesn't prevent them from making a wide smile
arm that has a different skin tone, length, and general shape than the other
series of scars and callouses that appear over any exposed skin, perhaps the result of many brutal sparring sessions
tail that for all intents and purposes they shouldn't have
pair of havy bags under their eyes, indicative of an inability to sleep well
complete lack of hair on their body
interesting pair of eyes, their [left, right] eye is brown, while the other is |dragon color|
acid scar on the back of their [left, right] hand
scar around their neck
pair of thick spectacles that don't fit
one eye swollen over from a recent fight
beard that is visibly fake
holy symbol of |diety| branded onto their chest, presumably with a hot iron
mouthful of metal teeth, not all of which are of the same metal
forked tongue
missing [left, right] ear

#tattoo:
octopus reaching around their [left, right] forearm
all-seeing eye on the back of their [neck, left hand, right hand]
ship's anchor on their [right, left] shoulder
dagger on the back of their [left, right] calf
|dragon color| colored scale that is almost lifelike in detail
series of draconic runes on their forehead. Anyone who investigates it falls victim to a suggestion spell as it reads "Stop looking at my forehead"
map of an oddly shapped island with a red X on one of its shores
arrow wrapping around their [left, right] wrist
arrow stretching down their inner forearm
skull on their [left arm, right arm, neck, chest, left ankle, right ankle]
snake coiling up their [left, right] arm
spiderweb on their [left, right] shoulder
heart on their chest
rose, stem and all, on their neck
ring of thorns which wraps around their neck
mermaid, languishing on a rock on their [left, right] arm
|dragon color| dragon which takes up their entire back

#hairstyle:
[thick, wispy, straight, wavy, curly, wiry, oily, lush, poofy, greasy, unruly, short-cropped] hair
long braids coiled tight against their head
locks curled in such a way that you assume must be high-maintence

#height:
unusually short
short in stature
[average, slightly above average, well above average] height

#physical build:
thin and delicate
of average build
well-muscled
slightly overweight
rather overweight
lean and lanky
lithe and lean
thin and wiry
sinewy and strong
flabby and weak
thin and flimsy
soft and chubby
thin and petite
pudgy, to be polite
big and broad
stocky and strong
bony
wide and ponderous
covered in hair

#jewelry:
single earing on the [left, right] ear
pair of earings
[small, large] chain about the neck
brooch with a family crest of sorts
ring on their [left, right] [pinky, ring, middle, index] finger
ring on their [left, right] thumb
several rings across both of their hands
bracelet around their [left, right] wrist
medallion
ornate belt buckle

#gemstone:
amethyst
crystal
diamond
emerald
jade
obsidian
opal
pearl
ruby
sapphire
topaz
turqoise

#metal:
steel
bronze
pewter
copper
silver
electrum
gold
platinum
`