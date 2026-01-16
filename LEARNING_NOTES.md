# Blockchain Learning Notes

## What is a Nonce?

**Nonce** = "Number used ONCE"

- A counter that increments with each mining attempt
- Changes the input to the hash function, producing different outputs
- Used to find a hash that meets the difficulty requirement (leading zeros)

## How Proof of Work Mining Works

The mining process doesn't "attach" leading zeros to hashes. Instead:

1. SHA256 produces pseudo-random output based on input
2. By changing the nonce and rehashing repeatedly, we generate different hashes
3. We keep trying until we randomly find a hash that *happens* to start with the required number of zeros
4. This is called "proof of work" - you prove you did the computational work by finding a rare hash

**Key Insight:** We're not creating leading zeros, we're searching for them!

## Common Bugs & Fixes

### Bug: Hash Calculation with Nonce

**Problem:**
```javascript
JSON.stringify(this.data + this.nonce)
```

**Why it's wrong:**
- Converts `this.data` (object) to string first
- Then adds `nonce` (number), causing JavaScript to coerce both to strings
- Results in string concatenation, not proper data serialization

**Correct approach:**
```javascript
JSON.stringify(this.data) + this.nonce
```
- Stringify the data object separately
- Then concatenate the nonce number
- Semantically correct and maintains data integrity

## JavaScript Tricks

### Creating Repeated Strings with Array

```javascript
Array(difficulty + 1).join("0")
```

**How it works:**
- `Array(5)` creates an array with 5 empty slots
- `.join("0")` joins these slots with "0" between them
- This produces **n-1** zeros (for `Array(5)`, you get 4 zeros)
- Therefore, `Array(difficulty + 1).join("0")` gives exactly `difficulty` zeros

**Example:** 
- `Array(6).join("0")` → `"00000"` (5 zeros)

## Mining Process Flow

1. Block is created with `nonce = 0`
2. Calculate hash of block data + nonce
3. Check if hash starts with required leading zeros
4. If not, increment nonce and recalculate
5. Repeat until hash meets difficulty requirement
6. This computational work secures the blockchain

## Key Takeaways

- Mining is a brute-force search for specific hash patterns
- The nonce is what makes each hash attempt unique
- Higher difficulty = more leading zeros = exponentially more attempts needed
- This is what makes blockchain secure - altering past blocks requires re-mining
