# Rubik's Cube Solving using Kociemba Algorithm  
*Aero Hackathon Repository of Collins Aerospace*  

## 📌 Introduction  
This project implements a solver for the **3x3 Rubik’s Cube** using the **Kociemba Algorithm**.  
The Kociemba algorithm is a two-phase solving algorithm that finds an **optimal or near-optimal solution** (usually under 20 moves) for any scrambled cube state.  

-----------

## 🧩 What is a Rubik's Cube?  
A **3x3 Rubik’s Cube** is a mechanical puzzle invented by **Ernő Rubik** in 1974. It consists of:  

- **6 faces**, each with a solid color (White, Yellow, Blue, Green, Red, Orange).  
- **26 smaller cube pieces** (*cubies*):  
  - **8 corner pieces** (3 stickers each)  
  - **12 edge pieces** (2 stickers each)  
  - **6 fixed centers** (1 sticker each, determine face color).  

When solved, each face has a uniform color.  

### Fun Facts:  
- Total possible cube states: **43 quintillion (4.3 × 10^19)**.  
- Proven that any cube can be solved in **≤ 20 moves** (*God’s Number*).  
- World record solve time: **~3 seconds** by professional speedcubers.  

---

## ⚙️ Algorithm Overview (Kociemba’s Algorithm)  
Kociemba’s Algorithm is a **two-phase solver**:  

1. **Phase 1** – Reduces the cube to a subgroup where moves are easier to handle (orienting edges, restricting cube state).  
2. **Phase 2** – Solves the cube completely from the reduced state using fewer moves.  

This method is widely used because it produces **short, efficient solutions** compared to beginner or layer-by-layer methods.  

---

## 🎮 Cube Move Notations: 
- **U** = Up face clockwise  
- **D** = Down face clockwise  
- **L** = Left face clockwise  
- **R** = Right face clockwise  
- **F** = Front face clockwise  
- **B** = Back face clockwise  
- Adding `'` means **counter-clockwise** (e.g., **U'**)  
- Adding `2` means **180° rotation** (e.g., **R2**)  

---

## 🚀 Features  
- Solves any valid Rubik’s Cube scramble.  
- Uses Kociemba’s Algorithm for efficiency.  
- Provides move sequence in standard cube notation.  
- Optimized to keep solutions under 20 moves  

---

## 🛠️ Installation & Usage  

### Clone Repository  
```bash
git clone https://github.com/your-username/Rubik-s-Cube-Solving-using-Kociemba-Algorithm.git
cd Rubik-s-Cube-Solving-using-Kociemba-Algorithm


