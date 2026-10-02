def update_file(filepath, new_beat1, new_beat2, new_code=None):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    b1_start = content.find("## Beat 1:")
    sim_start = content.find(":::simulation-widget")
    if b1_start == -1 or sim_start == -1:
        raise ValueError(f"Could not find Beat 1 boundaries in {filepath}")
    content = content[:b1_start] + new_beat1.strip() + "\n\n" + content[sim_start:]

    b2_start = content.find("## Beat 2:")
    b3_start = content.find("## Beat 3:")
    if b2_start == -1 or b3_start == -1:
        raise ValueError(f"Could not find Beat 2 boundaries in {filepath}")
    content = content[:b2_start] + new_beat2.strip() + "\n\n" + content[b3_start:]

    if new_code:
        py_start = content.find("```python\n")
        if py_start != -1:
            py_end = content.find("```\n:::", py_start)
            if py_end != -1:
                content = content[:py_start + 10] + new_code.strip() + "\n" + content[py_end:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")
