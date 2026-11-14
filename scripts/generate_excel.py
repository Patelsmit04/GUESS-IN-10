import json
import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_excel():
    dump_path = os.path.join(os.path.dirname(__file__), 'cards_dump.json')
    with open(dump_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    categories = data['categories']
    cards = data['cards']

    wb = openpyxl.Workbook()
    # Remove default sheet
    wb.remove(wb.active)

    # Styling presets
    header_fill_purple = PatternFill(start_color='5B3EE4', end_color='5B3EE4', fill_type='solid')
    header_fill_dark = PatternFill(start_color='2D264B', end_color='2D264B', fill_type='solid')
    header_font = Font(name='Segoe UI', size=11, bold=True, color='FFFFFF')
    
    title_font = Font(name='Segoe UI', size=16, bold=True, color='5B3EE4')
    subtitle_font = Font(name='Segoe UI', size=10, italic=True, color='555555')
    bold_font = Font(name='Segoe UI', size=10, bold=True)
    regular_font = Font(name='Segoe UI', size=10)
    
    zebra_fill = PatternFill(start_color='F8F7FF', end_color='F8F7FF', fill_type='solid')
    white_fill = PatternFill(start_color='FFFFFF', end_color='FFFFFF', fill_type='solid')
    
    thin_border = Border(
        left=Side(style='thin', color='E2E0EE'),
        right=Side(style='thin', color='E2E0EE'),
        top=Side(style='thin', color='E2E0EE'),
        bottom=Side(style='thin', color='E2E0EE')
    )

    top_align = Alignment(vertical='top', wrap_text=True)
    center_align = Alignment(vertical='top', horizontal='center', wrap_text=True)

    columns = [
        ('category_name', 'Category Name', 20),
        ('category_id', 'Category ID', 15),
        ('card_name', 'Card Name', 22),
        ('emoji', 'Emoji', 8),
        ('difficulty', 'Difficulty', 12),
        ('buzz_word_1', 'Buzz Word 1', 16),
        ('buzz_word_2', 'Buzz Word 2', 16),
        ('buzz_word_3', 'Buzz Word 3', 16),
        ('all_buzz_words', 'All Buzz Words', 28),
        ('clue_1', 'Clue 1 (Numbered)', 40),
        ('clue_2', 'Clue 2 (Numbered)', 40),
        ('clue_3', 'Clue 3 (Numbered)', 40),
        ('primary_clues', 'Primary Clues', 42),
        ('secondary_clues', 'Secondary Clues', 42),
        ('fact_grid_1', 'Fact 1', 20),
        ('fact_grid_2', 'Fact 2', 20),
        ('fact_grid_3', 'Fact 3', 20),
        ('fact_grid_4', 'Fact 4', 20),
        ('all_fact_grid', 'All Facts Summary', 35),
        ('bonus_question', 'Bonus Trivia Question', 40),
        ('bonus_answer', 'Bonus Trivia Answer', 25),
        ('fun_fact', 'Fun Fact', 35),
        ('elimination_clues', 'Elimination Clues', 35),
        ('aliases', 'Accepted Answer Aliases', 32),
        ('explanation', 'Educational Explanation', 45),
        ('raw_facts', 'Raw Facts (JSON)', 30),
        ('card_id', 'Card ID', 24)
    ]

    # ==========================================
    # SHEET 1: OVERVIEW & CATEGORIES
    # ==========================================
    ws_ov = wb.create_sheet(title='Overview')
    ws_ov.views.sheetView[0].showGridLines = True

    ws_ov['A1'] = 'GUESS 10 — COMPLETE CARD TRIVIA DATABASE'
    ws_ov['A1'].font = title_font
    ws_ov['A2'] = 'Master database of all categories, secret cards, buzz-words, physical clues, facts, and bonus questions.'
    ws_ov['A2'].font = subtitle_font

    ws_ov['A4'] = 'Total Verified Cards:'
    ws_ov['A4'].font = bold_font
    ws_ov['B4'] = len(cards)
    ws_ov['B4'].font = Font(name='Segoe UI', size=11, bold=True, color='2E7D32')

    ws_ov['A5'] = 'Total Categories:'
    ws_ov['A5'].font = bold_font
    ws_ov['B5'] = len(categories)
    ws_ov['B5'].font = Font(name='Segoe UI', size=11, bold=True, color='5B3EE4')

    ov_headers = ['Category ID', 'Category Name', 'Icon', 'Cards Count', 'Description']
    for col_idx, h in enumerate(ov_headers, start=1):
        cell = ws_ov.cell(row=7, column=col_idx, value=h)
        cell.font = header_font
        cell.fill = header_fill_purple
        cell.alignment = Alignment(horizontal='center' if col_idx in [1, 3, 4] else 'left', vertical='center')

    for r_idx, cat in enumerate(categories, start=8):
        c_cards = [c for c in cards if c['category_id'] == cat['id']]
        ws_ov.cell(row=r_idx, column=1, value=cat['id']).alignment = Alignment(horizontal='center')
        ws_ov.cell(row=r_idx, column=2, value=cat['name']).font = bold_font
        ws_ov.cell(row=r_idx, column=3, value=cat['icon']).alignment = Alignment(horizontal='center')
        ws_ov.cell(row=r_idx, column=4, value=len(c_cards)).alignment = Alignment(horizontal='center')
        ws_ov.cell(row=r_idx, column=5, value=cat.get('description', '')).alignment = top_align

        fill = zebra_fill if r_idx % 2 == 0 else white_fill
        for c in range(1, 6):
            ws_ov.cell(row=r_idx, column=c).border = thin_border
            if ws_ov.cell(row=r_idx, column=c).fill.fill_type is None:
                ws_ov.cell(row=r_idx, column=c).fill = fill

    ws_ov.column_dimensions['A'].width = 18
    ws_ov.column_dimensions['B'].width = 28
    ws_ov.column_dimensions['C'].width = 10
    ws_ov.column_dimensions['D'].width = 14
    ws_ov.column_dimensions['E'].width = 75

    # ==========================================
    # SHEET 2: ALL 408 CARDS MASTER
    # ==========================================
    ws_all = wb.create_sheet(title='All 408 Cards')
    ws_all.views.sheetView[0].showGridLines = True
    ws_all.freeze_panes = 'C2'  # Freeze Category & Card Name columns

    # Headers
    for c_idx, (_, col_name, width) in enumerate(columns, start=1):
        cell = ws_all.cell(row=1, column=c_idx, value=col_name)
        cell.font = header_font
        cell.fill = header_fill_purple
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        ws_all.column_dimensions[get_column_letter(c_idx)].width = width
    ws_all.row_dimensions[1].height = 28

    # Rows
    for r_idx, card in enumerate(cards, start=2):
        row_fill = zebra_fill if r_idx % 2 == 0 else white_fill
        ws_all.row_dimensions[r_idx].height = 42

        for c_idx, (key, _, _) in enumerate(columns, start=1):
            val = card.get(key, '')
            cell = ws_all.cell(row=r_idx, column=c_idx, value=val)
            cell.font = regular_font
            cell.fill = row_fill
            cell.border = thin_border

            if key in ['emoji', 'difficulty', 'category_id']:
                cell.alignment = center_align
            else:
                cell.alignment = top_align

            if key == 'card_name':
                cell.font = bold_font

    # Enable AutoFilter
    max_col_letter = get_column_letter(len(columns))
    ws_all.auto_filter.ref = f'A1:{max_col_letter}{len(cards) + 1}'

    # ==========================================
    # SHEETS 3..12: INDIVIDUAL CATEGORY SHEETS
    # ==========================================
    for cat in categories:
        cat_id = cat['id']
        cat_cards = [c for c in cards if c['category_id'] == cat_id]
        
        # Clean title (Excel sheet names limit: 31 chars, no invalid chars)
        safe_title = cat['name'][:30].replace('/', '-').replace(':', '')
        ws_cat = wb.create_sheet(title=safe_title)
        ws_cat.views.sheetView[0].showGridLines = True
        ws_cat.freeze_panes = 'C2'

        # Headers
        for c_idx, (_, col_name, width) in enumerate(columns, start=1):
            cell = ws_cat.cell(row=1, column=c_idx, value=col_name)
            cell.font = header_font
            cell.fill = header_fill_dark
            cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
            ws_cat.column_dimensions[get_column_letter(c_idx)].width = width
        ws_cat.row_dimensions[1].height = 28

        for r_idx, card in enumerate(cat_cards, start=2):
            row_fill = zebra_fill if r_idx % 2 == 0 else white_fill
            ws_cat.row_dimensions[r_idx].height = 42

            for c_idx, (key, _, _) in enumerate(columns, start=1):
                val = card.get(key, '')
                cell = ws_cat.cell(row=r_idx, column=c_idx, value=val)
                cell.font = regular_font
                cell.fill = row_fill
                cell.border = thin_border

                if key in ['emoji', 'difficulty', 'category_id']:
                    cell.alignment = center_align
                else:
                    cell.alignment = top_align

                if key == 'card_name':
                    cell.font = bold_font

        ws_cat.auto_filter.ref = f'A1:{max_col_letter}{len(cat_cards) + 1}'

    # Save Excel workbook
    output_xlsx = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'GUESS_10_ALL_CARDS_DATABASE.xlsx')
    wb.save(output_xlsx)
    print(f'Successfully generated Excel file at: {output_xlsx}')

    # Also save CSV for easy raw inspection
    import csv
    output_csv = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'GUESS_10_ALL_CARDS_DATABASE.csv')
    with open(output_csv, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([col_name for _, col_name, _ in columns])
        for card in cards:
            writer.writerow([card.get(key, '') for key, _, _ in columns])
    print(f'Successfully generated CSV file at: {output_csv}')

if __name__ == '__main__':
    build_excel()
