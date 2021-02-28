const npcTraits = `
- for reference, any line which starts with a hyphen is treated as a comment

#template:
Meet |name|, a |alignment| |race| |gender|
You see <a> |race| named |name|, who is <a> |player class|

#name:
Bob
Bob the brave
Alice the [destroyer, slayer of |dragon color| dragons, beautiful]
- TODO come up with better names, and have "bob the |adjective|"

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
`