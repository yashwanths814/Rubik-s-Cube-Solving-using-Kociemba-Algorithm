import pycuber as pc
import kociemba

# Convert pycuber cube to face colors for frontend
def get_cube_face_colors(cube):
    face_labels = ['U', 'D', 'L', 'R', 'F', 'B']
    cube_state = {}
    for face in face_labels:
        matrix = cube.get_face(face)
        cube_state[face] = [matrix[i][j].colour.lower() for i in range(3) for j in range(3)]
    return cube_state

# Convert cube to kociemba-compatible string
def get_kociemba_string(cube):
    face_order = ['U', 'R', 'F', 'D', 'L', 'B']
    center_colors = {}
    face_str = ''
    for face in face_order:
        center = cube.get_face(face)[1][1]
        center_colors[center.colour] = face
    for face in face_order:
        face_matrix = cube.get_face(face)
        for i in range(3):
            for j in range(3):
                sticker = face_matrix[i][j]
                face_str += center_colors[sticker.colour]
    return face_str

# Solve and return all 3 components: solution, scrambled state, solved state
def solve_and_animate(scramble_moves):
    cube = pc.Cube()
    try:
        cube(pc.Formula(scramble_moves))
    except Exception:
        raise ValueError("Invalid scramble sequence")

    scrambled_state = get_cube_face_colors(cube)
    try:
        kociemba_str = get_kociemba_string(cube)
        solution = kociemba.solve(kociemba_str)
    except Exception:
        raise ValueError("Solving failed")

    # Animate through solution
    move_sequence = solution.split()
    steps = [scrambled_state]
    for move in move_sequence:
        cube(pc.Formula(move))
        steps.append(get_cube_face_colors(cube))

    solved_state = steps[-1]

    return {
        "solution": solution,
        "scrambled_cube": scrambled_state,
        "solved_cube": solved_state,
        "animation": steps  # list of cube states for each step
    }


# Apply a single move and return updated cube state
def apply_single_move(cube_state_dict, move):
    cube = pc.Cube()

    # Color to face mapping
    color_to_face = {
        'white': 'U',
        'yellow': 'D',
        'orange': 'L',
        'red': 'R',
        'green': 'F',
        'blue': 'B'
    }

    # Apply current cube state to pycuber cube
    for face in ['U', 'D', 'L', 'R', 'F', 'B']:
        matrix = cube.get_face(face)
        for i in range(3):
            for j in range(3):
                idx = i * 3 + j
                color = cube_state_dict[face][idx].capitalize()
                matrix[i][j].colour = color

    # Apply the move
    cube(pc.Formula(move))

    # Return the new state
    return get_cube_face_colors(cube)
