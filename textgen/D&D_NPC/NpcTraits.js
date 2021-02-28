const npcTraits = `
- for reference, any line which starts with a hyphen is treated as a comment

#template:
|name|, a |alignment| |race| |gender|
You see <a> |race| named |name|, who is <a> |player class|
Sitting across from you at the table you see <a> |race| |gender|; the most interesting part about their appearance is that they have <a> |distinguishing feature|.

#name:
Winestock
Syndelle
LaBorde
Cowage
Kiefer
Malezar
Vargus
Coyle
Kissane
Elvidge
Rylance
Bristow
Slatter
Blewitt
Symons
Charlton
Brims
Plooy
Golenko
Keogh
Hendry
Whetter
Stamey
Gradwell
Manon
Fazeli
Capkun
Cainus
Cardone
Chancellor
Yellin
Linton
Segler
Maratta
Carbanero
Chambers
Guray
Littlemore
Chubbs
Huey
Lawton
Letner
Wroe
Melancon
Sahin
Heri
Javed
Molowitch
Maity
Livi
Gronbeck
Manjoot
Roesch
Ozden
Harrop
Grunstand
Fliss
Toomey
Pron
Blundy
Horne
Tarrant
Whitelocke
Hibbard
Northover
Westwood
Brunner
Byrne
Danby
Keevan
Fife
Fares
Hefferman
Smiff
Wareham
Amali
Jasin
Elmes
Lam
Durkee
Pinder
Mehl
Yana
Guntis
Rippon
Clave
Riwaka
Critichety
Skene
Huckle
Eveleigh
Grist
Dizon
Punch
Dobner
Rixon
Corley
Grati
Valka
Shawcross
Exton
Graff
Denton
Beers
Vistan
Debose
Khamedoost
Velasco
Cossey
Ditko
Gruenwald
Buscema
Ineson
Thebeau
Poirier
Framestone
Spruce
Bardak
Duprat
Borgstrum
Houte
Rath
Yip
Horsfield
Penhale
Saturnyne
Wesche
Malenfant
Schott
Bomsteen
Wheeldin
Kullmark
Mellycott
Denker
Warworst
Hassell
Dobson
Coxon
Eccelston
Leenster
Boole
Allnutt
Vaughnan
Wiltshire
Senn
Willoughby
Comerford
Aidan
Horey
Fredland
Bagg
Rosco
Guinery
Lindsell
Yasca
Horik
Ralf
Maxwell
Gilray
Gribbon
Crowther
Crowder
Boyd
Jahke
Jolliffe
Komene
Cordella
Shakes
Traetta
Peppard
Verling
Bray
Zemetis
Whelan
Davery
Baird
Moxam
Seffrin
Crombie
Lillis
Garside
Whitby
Carmalis
Stripp
Miglett
Hooten
Alarcon
Gravett
Hardinger
Gyerman
Marfleet
Sawtell
Strobel
Gunnarson
Wilding
Clappison
Mandt
Kjell
Cant
Stussy
Ballantyne
Saturno
Kern
Rhinehart
Null
Durkeep
Chiwetel
Mads
Landecker
Pye
Graze
Hoppeton
Featherstone
Monteith
Ironshields
Lumley
Bardsley
Baumgartner
Tovar
Lecards
Lasky
Nagle
Bunnag
Darrow
Knue
Elba
Hamish
Valera
Amanti
Hurst
Rinna
Onyekyere
Saric
Fendick
Kosta
Skovli
Callum
Ridge
Archer
Tendolle
Kirkwood
Coulam
Raki
Ballantine
Zebulon
Eggins
Pommy
Jonay
Kiri
Grassi
Brough
Connors
Bowler
Aird
Sorby
Haystacks
Dare
Parkal
Suna
Struth
Romita
Abnett
Nims
Farkas
Darch
Malik
Kornel
Faulkes
Horley
Trezzi
Newbury
Hoddins
Loddins
Braga
Morley
Hackl
Calle
Boomsville
Razo
Majors
Habberstad
Brock
Newirth
Coughlin
Phate
Ledbetter
Fendick
Wayan
Rook
Gunn
Binns
Endicott
Pennycooke
Shed
Alphona
Pettigrove
Hasche
Kurple
Nittmann
Jannic

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

#tattoo:
octopus reaching around their [left, right] forearm
all-seeing eye on the back of their [neck, left hand, right hand]
ship's anchor on their [right, left] shoulder
dagger on the back of their [left, right] calf
|dragon color| colored scale that is almost lifelike in detail
`