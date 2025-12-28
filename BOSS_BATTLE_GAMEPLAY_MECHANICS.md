# Boss Battle Gameplay System - Advanced Mechanics

## 🎮 Overview

The boss battle system now features **real turn-based gameplay** with strategic depth, proper damage calculations, adaptive boss AI, and meaningful player choices. It's no longer just clicking buttons—every decision matters.

---

## ⚔️ Core Gameplay Loop

```
PLAYER TURN:
  1. Choose Action (Attack / Defend / Counter Myth / Use Companion)
  2. Action resolves with damage calculation
  3. Display feedback in combat log
  
BOSS TURN:
  1. Boss AI calculates best action based on state
  2. Boss executes attack
  3. Display boss attack in combat log
  
RESOLUTION:
  1. Check for phase transitions
  2. Check for victory/defeat
  3. Advance turn counter
  4. Manage cooldowns & status effects
  5. Return to player turn
```

---

## 🎯 Player Actions & Mechanics

### 1. **Attack** 💥
- **Damage Range:** 18-25 + ATK stat
- **Defense:** None (takes full damage)
- **Strategic Use:** High-risk, high-reward early turns
- **Mechanic:** Standard offensive action
- **Cooldown:** None

**Gameplay Example:**
```
Turn 5:
💥 You attack! Deal 32 damage!
⚡ Boss uses "Sugar Storm"! You take 14 damage!
```

---

### 2. **Defend** 🛡️
- **Damage Output:** 2-6 + 2
- **Defense Reduction:** 50% reduction to next damage
- **Strategic Use:** Survival in low-health scenarios
- **Mechanic:** Reduces next enemy attack by 50%
- **Duration:** Applies to immediate next damage only

**Gameplay Example:**
```
Turn 7:
🛡️ You take a defensive stance! (Reduce next damage by 50%)
🔥 Boss uses "Processed Onslaught" but your defense blocks half!
→ Took 7 damage instead of 14
```

---

### 3. **Counter Myth** 💡
- **Damage Range:** 10-15 + WIS stat
- **Defense:** No direct defense (educational priority)
- **Strategic Use:** Educational gameplay, combo rewards
- **Mechanic:** Wisdom-based damage with combo tracking
- **Combo System:** 
  - 3 myth counters in a row = +100 XP bonus
  - Combo resets on non-counter action
  - Teaches nutrition facts through gameplay

**Gameplay Example:**
```
Turn 3:
💡 Counter Myth! "Truth Beats Lies!" Deal 22 wisdom damage! (1/3 myths countered)
✓ Boss Myth: "Refined carbs taste better"
✓ Your Counter: "Whole grains provide complex flavors!"

Turn 4:
💡 Counter Myth! Deal 19 wisdom damage! (2/3 myths countered)

Turn 5:
💡 Counter Myth! Deal 25 wisdom damage! (3/3 myths countered)
⭐ COMBO! 3 myths countered! +100 XP bonus!
```

---

### 4. **Use Companion** 🎁
- **Damage Range:** 12-28 damage
- **Defense:** None (takes full damage)
- **Strategic Use:** High burst damage when available
- **Mechanic:** 2-turn cooldown system
  - Turn 1: Use companion ability
  - Turn 2: Companion recovers
  - Turn 3: Available again
- **Requirement:** Must have at least 1 companion collected

**Gameplay Example:**
```
Turn 6:
🎁 🌾 Quinoa Spirit attacks! Deal 20 damage!
⏳ Companion is recovering...

Turn 7:
⏳ Companion is still recovering... (1 more turn)

Turn 8:
🎁 Quinoa ready! Can use companion again
```

---

## 🤖 Boss AI System

### AI Decision Making
The boss chooses actions based on **health state**, not randomly:

#### **Healthy Phase (100% - 60% HP)**
- Boss uses balanced attack pattern
- Prefers first available attack
- Conservative, testing player defenses
- Gives player time to learn patterns

#### **Mid-Health Phase (60% - 30% HP)**
- Boss mixes attacks more aggressively
- Unpredictable but not overwhelming
- Challenges player to adapt
- Tests different strategies

#### **Low-Health Phase (30% - 0% HP)**
- Boss becomes DESPERATE
- Favors stronger attacks
- High-damage turn sequences
- Requires player skill to survive

### Phase Transitions
- Boss automatically enters new phase at health thresholds
- Each phase has unique movesets
- Phase description changes in UI
- Damage scaling increases per phase (20% multiplier)

**Boss AI Flow:**
```
Boss Health: 100%
→ "I'll test your defenses with basic attacks"
↓
Boss Health: 50%
→ "You're tougher than expected! Time to get serious!"
↓
Boss Health: 25%
→ "ARGH! DEFEAT YOU AT ANY COST!"
↓
Boss Health: 0%
→ "Impossible... defeated by nutrition facts...?"
```

---

## 📊 Damage Calculations

### Player Damage Formula
```
Base Damage = Action-specific random + Player Stat

Attack:     18-25 + ATK
Defend:     2-6 + 2
Counter:    10-15 + WIS
Companion:  12-28 (fixed, no scaling)

Final Damage = Base Damage
(Modified by boss's active defenses if applicable)
```

### Boss Damage Formula
```
Base Damage = Move-specific damage value

Final Damage = Base Damage * (1 + Phase_Multiplier)
            = Base Damage * (1 + CurrentPhase * 0.2)

Phase 0: Base Damage * 1.0 (no multiplier)
Phase 1: Base Damage * 1.2 (20% increase)
Phase 2: Base Damage * 1.4 (40% increase)

THEN if player defending:
Final Damage = Final Damage * 0.5 (50% reduction)
```

### Example Damage Chain
```
Boss has 3-attack moveset:
Move 1: "Sugar Storm" - 12 base damage
Move 2: "Empty Bite Blast" - 10 base damage
Move 3: "White Bread Barrage" - 8 base damage

Phase 0 (100% HP):
- Sugar Storm: 12 damage
- Empty Bite Blast: 10 damage
- White Bread Barrage: 8 damage

Phase 1 (50% HP - 30% increase):
- Sugar Storm: 14 damage (12 * 1.2)
- Empty Bite Blast: 12 damage (10 * 1.2)
- White Bread Barrage: 9 damage (8 * 1.2)

If Player Defending:
- Sugar Storm: 7 damage (14 * 0.5)
- Empty Bite Blast: 6 damage (12 * 0.5)
- White Bread Barrage: 4 damage (9 * 0.5)
```

---

## 🔥 Combat Log System

### Combat Log Display
- Shows last 10 actions in reverse chronological order
- Scrollable history of battle events
- Color-coded messages:
  - 💥 Player attacks
  - 🛡️ Defense/protection
  - 💡 Myth counters
  - 🎁 Companion abilities
  - ⚡ Boss attacks
  - 🎉 Victory moments
  - 💔 Defeat indicators

### Example Combat Log
```
⭐ COMBO! 3 myths countered! +100 XP bonus!
💡 Counter Myth! Deal 25 wisdom damage! (3/3 myths countered)
⚡ Boss uses "Instant Noodle Cyclone"! You take 12 damage!
💡 Counter Myth! Deal 22 wisdom damage! (2/3 myths countered)
⚡ Boss uses "Donut Downpour"! You take 13 damage!
💡 Counter Myth! "Truth Beats Lies!" Deal 20 wisdom damage! (1/3 myths countered)
🛡️ You take a defensive stance! (Reduce next damage by 50%)
⚡ Boss uses "Sugar Storm" but your defense blocks half!
💥 You attack! Deal 28 damage!
⚔️ Battle Start! Choose your first action...
```

---

## 📈 Turn System

### Turn Counter
- Increments after each complete action cycle
- Shows battle progression
- Displayed in top-right corner
- Victory/defeat screens show final turn count

### Cooldown Management
- **Companion Cooldown:** 2-turn cycle
  - Turn N: Use companion
  - Turn N+1: Recovering (grayed out, disabled)
  - Turn N+2: Available again
- **Status Effects:** Track remaining duration
- **Defender Status:** Only applies to next damage

### Turn Order
```
Turn 1: Player chooses → Boss responds
Turn 2: Player chooses → Boss responds
Turn 3: Player chooses → Boss responds
        (Companion recovered if used Turn 1)
...
Until victory or defeat
```

---

## 🎓 Strategic Depth

### Viable Strategies

#### Strategy 1: "Aggressive Offense"
- Spam Attack action
- High risk, potential quick wins
- Vulnerable to strong boss moves
- Requires good luck with damage rolls

#### Strategy 2: "Defensive Wall"
- Alternate Defend with other actions
- Reduces damage taken
- Longer battles
- Good for low-health situations

#### Strategy 3: "Myth Master" (Educational)
- Chain Counter Myth actions
- Bonus +100 XP for 3-combo
- Teaches nutrition facts
- Wisdom-based scaling rewarded
- **Intended playstyle for learning**

#### Strategy 4: "Companion Blitz"
- Use companions on cooldown
- High burst damage phases
- Manage cooldown timing
- Good for high-damage bosses

#### Strategy 5: "Balanced Approach"
- Mix all actions based on situation
- Adapt to boss pattern
- Most forgiving playstyle
- Requires understanding mechanics

### Decision Points Each Turn
```
Current Situation?
├─ Boss about to attack
│  └─ Health > 70%: Attack or Counter
│  └─ Health < 50%: Defend or Counter
├─ Low player health
│  └─ Defend for protection
│  └─ Or Counter for education bonus
├─ Companion available
│  └─ Use for burst damage
│  └─ Or save for critical moment
└─ Trying to learn nutrition
   └─ Counter Myth for combo rewards
```

---

## 📱 UI Elements

### Status Indicators
- **Turn Counter:** Shows current battle progression
- **Health Bars:** Both player and boss with percentage
- **Stat Display:** ATK, DEF, WIS values
- **Defending Status:** 🛡️ indicator when active
- **Companion Cooldown:** ⏳ icon when recovering
- **Combat Log:** Last 10 actions with emojis

### Action Buttons
```
[💥 Attack] - "High damage"
[🛡️ Defend] - "-50% next damage"
[💡 Counter] - "Wisdom-based"
[🎁 Companion] - "2-turn cooldown"
```

Each button shows:
- Action name
- Risk/reward summary
- Enabled/disabled status
- Cooldown indicator if applicable

---

## 🏆 Victory Conditions

### Victory Requirements
1. Reduce boss HP to 0 or below
2. Survive all boss attacks
3. Reach end of battle intact

### Victory Screen Shows
- "🎉 VICTORY! 🎉"
- Boss name defeated
- **Turn count** (player feedback)
- "Claim Rewards" button
- Returns to Chapter Select

### Rewards Upon Victory
- XP based on boss difficulty
- Sacred Plate Fragment (story progression)
- Companion unlocked (collectible)
- Cosmetic gear (visual reward)
- Recipe unlocked (practical reward)

---

## 💔 Defeat Conditions

### Defeat Requirements
- Player health reaches 0 or below
- Lost to boss attacks before defeating boss

### Defeat Screen Shows
- "💔 DEFEATED! 💔"
- Boss name that defeated you
- **Turn count** (shows how close you were)
- "Study the myth counters and try again!"
- "Retry Battle" button

### Retry Mechanics
- Full HP reset
- Keep learned knowledge
- Companion still available
- No XP penalty
- Strategic opportunity to try different approach

---

## 🧮 Player Stat Scaling

### Stats by Level
```
Level 1:
- Health: 100
- Defense: 12
- Attack: 17
- Wisdom: 11

Level 5:
- Health: 100
- Defense: 20
- Attack: 25
- Wisdom: 15

Level 10:
- Health: 100
- Defense: 30
- Attack: 35
- Wisdom: 20

Formula: Stat = Base + (Level * Multiplier)
Defense: 10 + (Level * 2)
Attack: 15 + (Level * 2)
Wisdom: 10 + (Level * 1)
```

### Stat Effects
- **Attack:** Increases damage from Attack and Companion actions
- **Defense:** Passive survivability (affects base health)
- **Wisdom:** Increases Counter Myth damage (educational reward)

---

## 🎯 Combo System

### Myth Counter Combos
- Track consecutive myth counters
- 3 in a row = +100 XP bonus
- Display in combat log: "(1/3 myths countered)"
- Resets if player uses non-counter action
- Encourages learning-focused playstyle

### Combo Bonus Trigger
```
Turn 3: Counter Myth (1/3)
Turn 4: Counter Myth (2/3)
Turn 5: Counter Myth (3/3)
        ⭐ COMBO! +100 XP bonus!
        (Combo resets)

BUT if:
Turn 3: Counter Myth (1/3)
Turn 4: Attack ← Breaks combo!
Turn 5: Counter Myth (1/3) ← Restarts at 1
```

---

## 📋 Game State Management

### Battle State Variables
- `battleTurns`: Current turn number
- `combatLog`: Last 10 actions
- `bossCurrentMove`: What boss just did
- `playerLastAction`: What player just chose
- `statusEffects`: Active debuffs/buffs
- `playerDefending`: Defense stance active?
- `bossPattern`: AI pattern tracker
- `companionOnCooldown`: Companion available?
- `mythsCountered`: Consecutive myth counters

### State Persistence
- Battle state maintained during fight
- Resets on new boss battle start
- Lost on retreat (intentional design)
- Victory doesn't reset (for rewards screen)

---

## 🎮 Difficulty Scaling

### Natural Difficulty Increases
1. **Phase Transitions:** Damage scales +20% per phase
2. **Enemy Adaptation:** Boss AI gets smarter at lower health
3. **Companion Cooldown:** Limits powerful ally access
4. **Defensive Drain:** Defending is reactive, not infinite

### Player Power Growth
1. **Level Ups:** +2 ATK/DEF per level, +1 WIS per level
2. **Companions:** Extra damage source, ability effects
3. **Strategy Knowledge:** Learning boss patterns
4. **Equipment:** (future feature) Cosmetic gear with stat bonuses

---

## ✨ Educational Integration

### Myth Countering Mechanics
- Boss says FALSE health claim
- Player uses "Counter Myth" action
- Combat log shows NUTRITION FACT
- Wisdom stat scales the effectiveness
- +100 XP for 3-combo rewards learning

### Learning Through Gameplay
- Boss myths match Chapter themes
- Counters provide accurate nutrition info
- Multiple myths per boss = multiple lessons
- Battles naturally teach through repetition
- Combo system motivates myth learning

---

## 🚀 Future Enhancements

### Potential Improvements
- Animation effects for each action
- Sound effects for attacks
- Boss voice lines/dialogue during battle
- Animation-based turn timing
- Status effect visual indicators
- Multiplier effects (weakness/resistance)
- Boss patterns player can learn
- Companion special abilities per spirit
- Equipment stat modifications
- Daily challenge difficulty tiers
- Leaderboard for speedruns
- New game+ mode with scaled difficulty

---

## 📊 Summary

**Boss battles are now:**
- ✅ Turn-based with strategic depth
- ✅ Educational through myth-countering
- ✅ Fair with skill-based mechanics
- ✅ Engaging with multiple viable strategies
- ✅ Rewarding for learning nutrition facts
- ✅ Balanced with proper damage scaling
- ✅ Feedback-rich with combat log
- ✅ Repeatable with retry mechanics

**No more:** Just clicking buttons with no consequence or strategy!

---

**Status:** ✅ Fully Implemented  
**Last Updated:** Current Session  
**Version:** 1.0
