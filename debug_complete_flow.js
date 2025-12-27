// Debug complete function flow for "is avocado better than pasta"
const input = "is avocado better than pasta";

console.log("=== STEP-BY-STEP DEBUGGING ===");
console.log("Original input:", input);

// 1. Check contextual reference detection
const hasContextualReference = 
  input.includes('these') || input.includes('which one') || input.includes('both') ||
  input.includes('them') || input.includes('it');
console.log("1. hasContextualReference:", hasContextualReference);

// 2. Check if referencedItems would be populated (needs messageHistory > 1)
console.log("2. messageHistory.length > 1:", false, "(first question, no history)");
const referencedItems = []; // Empty for first question
console.log("3. referencedItems.length:", referencedItems.length);

// 3. Check repeated question logic 
// (would need previousUserMessages to test, but for first question this should be false)
console.log("4. isRepeatedQuestion:", false, "(no previous messages)");

// 4. Check contextual response handling
const contextualCondition = hasContextualReference && referencedItems.length >= 2;
console.log("5. Contextual response condition:", contextualCondition);

// 5. Check direct food comparison logic (THIS SHOULD TRIGGER)
const foods = ['avocado', 'pasta', 'rice', 'chicken', 'salmon', 'egg', 'apple', 'banana', 'bread', 'cheese', 'milk'];
const mentionedFoods = foods.filter(food => input.includes(food));
console.log("6. mentionedFoods:", mentionedFoods);

const comparisonCondition = mentionedFoods.length >= 2 && (input.includes('better') || input.includes('vs') || input.includes('versus') || input.includes('compare'));
console.log("7. Direct food comparison condition:", comparisonCondition);

if (comparisonCondition) {
  const food1 = mentionedFoods[0];
  const food2 = mentionedFoods[1];
  const isAvocadoPasta = (food1 === 'avocado' || food2 === 'avocado') && (food1 === 'pasta' || food2 === 'pasta');
  console.log("8. food1:", food1, "food2:", food2);
  console.log("9. isAvocadoPasta specific condition:", isAvocadoPasta);
  
  if (isAvocadoPasta) {
    console.log("✅ SHOULD RETURN: Avocado vs pasta specific response");
  } else {
    console.log("✅ SHOULD RETURN: Generic food comparison response");
  }
} else {
  console.log("❌ PROBLEM: Not triggering food comparison logic");
}

// 6. Check food-related responses
console.log("10. input.includes('food'):", input.includes('food'));
console.log("11. Would hit food responses:", input.includes('food') || input.includes('cook') || input.includes('recipe') || input.includes('eat'));

console.log("\n=== CONCLUSION ===");
if (comparisonCondition) {
  console.log("✅ Should work - hitting direct food comparison");
} else {
  console.log("❌ Will fall through to generic responses");
}