"""
OKVIR 125-Lesson Master Curriculum Dataset Compiler
Parses all 12 Track Specification files (Pedagogy, Visuals, Code)
and outputs a unified JSON schema for:
1. Markdown .okvir.md files (125 files)
2. TypeScript curriculum modules for the web app runtime
"""

import os
import re
import json

def clean_text(text):
    if not text:
        return ""
    # strip markdown formatting headers if any
    return text.strip()

def extract_track_1():
    lessons = []
    # Read Pedagogy
    ped_content = open('TRACK1_PEDAGOGY_AND_KATEX_SPEC.md', 'r', encoding='utf-8').read()
    # Read Code
    code_content = open('TRACK1_CODE_AND_ASSERTIONS_SPEC.md', 'r', encoding='utf-8').read()
    # Read Visuals
    vis_content = open('TRACK1_VISUALS_AND_SIMULATION_SPEC.md', 'r', encoding='utf-8').read()

    # Split pedagogy by Lesson T1-XX
    ped_chunks = re.split(r'###\s+Lesson\s+T1-(\d+):\s+([^\n]+)', ped_content)
    # ped_chunks[0] is intro. Afterwards: index, title, content
    ped_map = {}
    for i in range(1, len(ped_chunks), 3):
        num = int(ped_chunks[i])
        title = ped_chunks[i+1].strip()
        body = ped_chunks[i+2]
        ped_map[num] = {'title': title, 'body': body}

    # Split code by Lesson `math-XX`
    code_chunks = re.split(r'####\s+Lesson\s+`?math-(\d+)`?:\s+([^\n]+)', code_content)
    code_map = {}
    for i in range(1, len(code_chunks), 3):
        num = int(code_chunks[i])
        title = code_chunks[i+1].strip()
        body = code_chunks[i+2]
        code_map[num] = {'title': title, 'body': body}

    # Split visuals by LESSON-T1-XX
    vis_chunks = re.split(r'###\s+LESSON-T1-(\d+)[:\s]+([^\n]+)', vis_content)
    vis_map = {}
    for i in range(1, len(vis_chunks), 3):
        num = int(vis_chunks[i])
        title = vis_chunks[i+1].strip()
        body = vis_chunks[i+2]
        vis_map[num] = {'title': title, 'body': body}

    print(f"Track 1 parsed: {len(ped_map)} pedagogy, {len(code_map)} code, {len(vis_map)} visuals")
    return ped_map, code_map, vis_map

def extract_track_2():
    ped_content = open('TRACK2_PEDAGOGY_AND_KATEX_SPEC.md', 'r', encoding='utf-8').read()
    code_content = open('TRACK2_CODE_AND_ASSERTIONS_SPEC.md', 'r', encoding='utf-8').read()
    vis_content = open('TRACK2_VISUALS_AND_SIMULATION_SPEC.md', 'r', encoding='utf-8').read()

    ped_chunks = re.split(r'##\s+Lesson\s+T2-(\d+)[:\s]+([^\n]+)', ped_content)
    ped_map = {}
    for i in range(1, len(ped_chunks), 3):
        num = int(ped_chunks[i])
        title = ped_chunks[i+1].strip()
        body = ped_chunks[i+2]
        ped_map[num] = {'title': title, 'body': body}

    code_chunks = re.split(r'###\s+Lesson\s+T2-(\d+)[:\s]+([^\n]+)', code_content)
    code_map = {}
    for i in range(1, len(code_chunks), 3):
        num = int(code_chunks[i])
        title = code_chunks[i+1].strip()
        body = code_chunks[i+2]
        code_map[num] = {'title': title, 'body': body}

    vis_chunks = re.split(r'####\s+LESSON-T2-(\d+)[:\s]+([^\n]+)', vis_content)
    vis_map = {}
    for i in range(1, len(vis_chunks), 3):
        num = int(vis_chunks[i])
        title = vis_chunks[i+1].strip()
        body = vis_chunks[i+2]
        vis_map[num] = {'title': title, 'body': body}

    print(f"Track 2 parsed: {len(ped_map)} pedagogy, {len(code_map)} code, {len(vis_map)} visuals")
    return ped_map, code_map, vis_map

def extract_track_3():
    ped_content = open('TRACK3_PEDAGOGY_AND_KATEX_SPEC.md', 'r', encoding='utf-8').read()
    code_content = open('TRACK3_CODE_AND_ASSERTIONS_SPEC.md', 'r', encoding='utf-8').read()
    vis_content = open('TRACK3_VISUALS_AND_SIMULATION_SPEC.md', 'r', encoding='utf-8').read()

    ped_chunks = re.split(r'##\s+LESSON-T3-(\d+)[:\s]+([^\n]+)', ped_content)
    ped_map = {}
    for i in range(1, len(ped_chunks), 3):
        num = int(ped_chunks[i])
        title = ped_chunks[i+1].strip()
        body = ped_chunks[i+2]
        ped_map[num] = {'title': title, 'body': body}

    code_chunks = re.split(r'###\s+LESSON-T3-(\d+)[:\s]+([^\n]+)', code_content)
    code_map = {}
    for i in range(1, len(code_chunks), 3):
        num = int(code_chunks[i])
        title = code_chunks[i+1].strip()
        body = code_chunks[i+2]
        code_map[num] = {'title': title, 'body': body}

    vis_chunks = re.split(r'(?:###|####)\s+LESSON-T3-(\d+)[:\s]+([^\n]+)', vis_content)
    vis_map = {}
    for i in range(1, len(vis_chunks), 3):
        num = int(vis_chunks[i])
        title = vis_chunks[i+1].strip()
        body = vis_chunks[i+2]
        vis_map[num] = {'title': title, 'body': body}

    print(f"Track 3 parsed: {len(ped_map)} pedagogy, {len(code_map)} code, {len(vis_map)} visuals")
    return ped_map, code_map, vis_map

def extract_track_4():
    ped_content = open('TRACK4_PEDAGOGY_AND_KATEX_SPEC.md', 'r', encoding='utf-8').read()
    code_content = open('TRACK4_CODE_AND_ASSERTIONS_SPEC.md', 'r', encoding='utf-8').read()
    vis_content = open('TRACK4_VISUALS_AND_SIMULATION_SPEC.md', 'r', encoding='utf-8').read()

    ped_chunks = re.split(r'###\s+Lesson\s+T4-(\d+)[:\s]+([^\n]+)', ped_content)
    ped_map = {}
    for i in range(1, len(ped_chunks), 3):
        num = int(ped_chunks[i])
        title = ped_chunks[i+1].strip()
        body = ped_chunks[i+2]
        ped_map[num] = {'title': title, 'body': body}

    code_chunks = re.split(r'###\s+LESSON-T4-(\d+)[:\s]+([^\n]+)', code_content)
    code_map = {}
    for i in range(1, len(code_chunks), 3):
        num = int(code_chunks[i])
        title = code_chunks[i+1].strip()
        body = code_chunks[i+2]
        code_map[num] = {'title': title, 'body': body}

    vis_chunks = re.split(r'###\s+Lesson\s+T4-(\d+)[:\s]+([^\n]+)', vis_content)
    vis_map = {}
    for i in range(1, len(vis_chunks), 3):
        num = int(vis_chunks[i])
        title = vis_chunks[i+1].strip()
        body = vis_chunks[i+2]
        vis_map[num] = {'title': title, 'body': body}

    print(f"Track 4 parsed: {len(ped_map)} pedagogy, {len(code_map)} code, {len(vis_map)} visuals")
    return ped_map, code_map, vis_map

if __name__ == '__main__':
    t1 = extract_track_1()
    t2 = extract_track_2()
    t3 = extract_track_3()
    t4 = extract_track_4()
    print("All tracks extracted successfully!")
