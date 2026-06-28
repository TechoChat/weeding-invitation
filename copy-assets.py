import shutil
import os

src_hero = r"C:\Users\Kevin\.gemini\antigravity-ide\brain\27c57550-dd84-4b18-abbb-b2970636acde\couple_hero_1782625588387.png"
dest_hero = r"d:\web\wedding\wedding-invitation\public\couple-hero.png"

src_ritual = r"C:\Users\Kevin\.gemini\antigravity-ide\brain\27c57550-dd84-4b18-abbb-b2970636acde\couple_ritual_1782625656357.png"
dest_ritual = r"d:\web\wedding\wedding-invitation\public\couple-ritual.png"

try:
    if os.path.exists(src_hero):
        shutil.copy2(src_hero, dest_hero)
        print("Copied couple-hero.png successfully.")
    else:
        print(f"Source file not found: {src_hero}")

    if os.path.exists(src_ritual):
        shutil.copy2(src_ritual, dest_ritual)
        print("Copied couple-ritual.png successfully.")
    else:
        print(f"Source file not found: {src_ritual}")
except Exception as e:
    print(f"Error occurred: {e}")
