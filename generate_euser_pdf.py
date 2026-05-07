"""
Euser Safaris — Brand Knowledge PDF Generator  v2
5-page document | All tables width-corrected to 17.4 cm content width
Optimised for LlamaParse + RAG ingestion
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.colors import HexColor
import os

# ─── COLOURS ────────────────────────────────────────────────────────────────
DARK_GREEN  = HexColor("#1B4332")
MID_GREEN   = HexColor("#2D6A4F")
LIGHT_GREEN = HexColor("#52B788")
PALE_GREEN  = HexColor("#D8F3DC")
AMBER       = HexColor("#F4A261")
DARK_AMBER  = HexColor("#E76F51")
COOL_GREY   = HexColor("#6C757D")
DARK_GREY   = HexColor("#343A40")
ROW_ALT     = HexColor("#EAF4EE")
GOLD        = HexColor("#D4A017")
BLUE_LINK   = HexColor("#1565C0")

# ─── PAGE GEOMETRY ──────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4          # 595.27 x 841.89 pt
LM = RM = 1.6 * cm          # left / right margins
TM = 2.6 * cm               # top margin  (room for header bar)
BM = 1.6 * cm               # bottom margin (room for footer)
CW = PAGE_W - LM - RM       # content width ≈ 17.74 cm  (use 17.4 cm for safety)
CW = 17.4 * cm              # ← hard-coded so all tables match

# ─── STYLES ─────────────────────────────────────────────────────────────────
def S(name, **kw):
    return ParagraphStyle(name, **kw)

H1   = S("H1",   fontName="Helvetica-Bold",  fontSize=18, textColor=DARK_GREEN,
          spaceAfter=2, leading=22)
H2   = S("H2",   fontName="Helvetica-Bold",  fontSize=11, textColor=MID_GREEN,
          spaceAfter=2, spaceBefore=6, leading=14)
H3   = S("H3",   fontName="Helvetica-Bold",  fontSize=9,  textColor=DARK_GREEN,
          spaceAfter=2, spaceBefore=4)
BODY = S("BODY", fontName="Helvetica",       fontSize=8,  textColor=DARK_GREY, leading=11)
NOTE = S("NOTE", fontName="Helvetica-Oblique", fontSize=7, textColor=COOL_GREY, leading=9.5)
CAP  = S("CAP",  fontName="Helvetica-Oblique", fontSize=8, textColor=COOL_GREY, leading=10)
LINK = S("LINK", fontName="Helvetica",       fontSize=7.5, textColor=BLUE_LINK, leading=10)
TAG  = S("TAG",  fontName="Helvetica-Oblique", fontSize=10, textColor=AMBER,   spaceAfter=4)

# table cell styles
TH  = S("TH",  fontName="Helvetica-Bold",  fontSize=7.5, textColor=colors.white,
         alignment=TA_CENTER, leading=10, wordWrap='CJK')
TC  = S("TC",  fontName="Helvetica",       fontSize=7.5, textColor=DARK_GREY,
         leading=10, wordWrap='CJK')
TCB = S("TCB", fontName="Helvetica-Bold",  fontSize=7.5, textColor=DARK_GREY,
         leading=10, wordWrap='CJK')
TCV = S("TCV", fontName="Helvetica-Bold",  fontSize=8,   textColor=DARK_GREEN,
         leading=11)   # price cells
TCL = S("TCL", fontName="Helvetica",       fontSize=6.5, textColor=BLUE_LINK,
         leading=9, wordWrap='CJK')   # URL cells

def p(text, sty=BODY):
    return Paragraph(text, sty)

def sp(h=4):
    return Spacer(1, h)

def hr(thick=0.8, col=MID_GREEN):
    return HRFlowable(width="100%", thickness=thick, color=col, spaceAfter=4, spaceBefore=2)

# ─── TABLE BUILDER ───────────────────────────────────────────────────────────
PAD = 3   # cell padding points

def tbl(data, widths, extra=None):
    """Build a styled table. widths must sum to CW."""
    base = [
        ("FONTNAME",        (0,0),(-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",        (0,0),(-1, 0), 8),
        ("BACKGROUND",      (0,0),(-1, 0), DARK_GREEN),
        ("TEXTCOLOR",       (0,0),(-1, 0), colors.white),
        ("ALIGN",           (0,0),(-1, 0), "CENTER"),
        ("VALIGN",          (0,0),(-1,-1), "MIDDLE"),
        ("FONTNAME",        (0,1),(-1,-1), "Helvetica"),
        ("FONTSIZE",        (0,1),(-1,-1), 7.5),
        ("ROWBACKGROUNDS",  (0,1),(-1,-1), [colors.white, ROW_ALT]),
        ("GRID",            (0,0),(-1,-1), 0.3, HexColor("#BBBBBB")),
        ("LINEBELOW",       (0,0),(-1, 0), 1.2, MID_GREEN),
        ("BOTTOMPADDING",   (0,0),(-1,-1), PAD),
        ("TOPPADDING",      (0,0),(-1,-1), PAD),
        ("LEFTPADDING",     (0,0),(-1,-1), 4),
        ("RIGHTPADDING",    (0,0),(-1,-1), 4),
    ]
    if extra:
        base.extend(extra)
    t = Table(data, colWidths=widths)
    t.setStyle(TableStyle(base))
    return t

# ─── HEADER / FOOTER ────────────────────────────────────────────────────────
def hf(canvas, doc):
    canvas.saveState()
    w, h = A4
    # header bar
    canvas.setFillColor(DARK_GREEN)
    canvas.rect(0, h-1.05*cm, w, 1.05*cm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawString(LM, h-0.72*cm, "EUSER SAFARIS  |  Beyond the Horizon")
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(w-RM, h-0.72*cm,
        "euser-safari-web.vercel.app  |  hello@euserasafaris.com")
    # amber stripe
    canvas.setFillColor(AMBER)
    canvas.rect(0, h-1.18*cm, w, 0.13*cm, fill=1, stroke=0)
    # footer
    canvas.setFillColor(DARK_GREEN)
    canvas.rect(0, 0, w, 0.85*cm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(LM, 0.28*cm,
        "© 2025 Euser Safaris Ltd  |  The Hub Karen, Nairobi  |  +254 720 123 456")
    canvas.drawRightString(w-RM, 0.28*cm, f"Page {doc.page} of 5")
    canvas.restoreState()

# ═══════════════════════════════════════════════════════════════════════════
# PAGE 1 — Company Profile & Destination Zones
# ═══════════════════════════════════════════════════════════════════════════
def page1():
    el = []
    el += [p("EUSER SAFARIS", H1),
           p("Beyond the Horizon — Kenya's Premier Safari & Travel Company", TAG),
           hr(), sp(3)]

    el += [p("Company At a Glance", H2), hr(0.4, PALE_GREEN)]
    # 2-col table: label | value   → 4.5 + 12.9 = 17.4
    W1, W2 = 4.5*cm, 12.9*cm
    co = [
        [p("ATTRIBUTE",TH),          p("DETAILS",TH)],
        [p("Brand Name",TCB),        p("Euser Safaris Ltd (formerly Benuki / Malaika Safaris)",TC)],
        [p("Founded",TCB),           p("2015  |  Nairobi, Kenya",TC)],
        [p("Head Office",TCB),       p("The Hub Karen, Shop G18, Karen Road, Nairobi",TC)],
        [p("Branch",TCB),            p("Sarit Centre, 2nd Floor, Westlands, Nairobi",TC)],
        [p("Phone / WhatsApp",TCB),  p("+254 720 123 456   |   +254 733 456 789",TC)],
        [p("Email",TCB),             p("hello@euserasafaris.com   |   bookings@euserasafaris.com",TC)],
        [p("Website",TCB),           p("https://euser-safari-web.vercel.app",TCL)],
        [p("Operating Hours",TCB),   p("Monday – Saturday: 08:00 – 18:00 EAT",TC)],
        [p("Accreditation",TCB),     p("Kenya Tourism Board (KTB) Registered  |  KATO Member #2189",TC)],
        [p("Guest Rating",TCB),      p("4.8 / 5.0 ★  (1,240+ verified Google & TripAdvisor reviews)",TC)],
        [p("Payment Methods",TCB),   p("M-Pesa  |  Bank Transfer  |  Visa/Mastercard  |  PayPal  |  Wise",TC)],
        [p("Deposit Policy",TCB),    p("30% deposit to secure booking; balance due 21 days before departure",TC)],
        [p("Cancellation",TCB),      p("Full refund >60 days  |  50% refund 30–60 days  |  No refund <30 days",TC)],
    ]
    el.append(tbl(co, [W1, W2]))
    el += [sp(6), p("Key Destination Zones & Safari Ecosystems", H2), hr(0.4, PALE_GREEN)]

    # 5-col destination table → 3.2+3.2+3.2+4.0+3.8 = 17.4
    d = [
        [p("DESTINATION",TH), p("ECOSYSTEM",TH), p("BEST SEASON",TH),
         p("PARK / RESERVE",TH), p("FROM NAIROBI",TH)],
        [p("Masai Mara",TCB), p("Savannah / Big 5",TC), p("Jul–Oct (Migration)\nJan–Mar (Cubs)",TC),
         p("Masai Mara National Reserve",TC), p("~270 km | 5–6 hrs drive",TC)],
        [p("Amboseli",TCB), p("Wetland / Elephants",TC), p("Year-round\nDry: Jun–Sep",TC),
         p("Amboseli National Park",TC), p("~240 km | 4–5 hrs drive",TC)],
        [p("Samburu",TCB), p("Semi-arid / Special Five",TC), p("Jan–Apr\nJun–Sep",TC),
         p("Samburu + Buffalo Springs NR",TC), p("~345 km | 5–6 hrs drive",TC)],
        [p("Tsavo",TCB), p("Red Elephant / Volcanic",TC), p("Jun–Sep\nDec–Mar",TC),
         p("Tsavo East NP + Tsavo West NP",TC), p("~250 km | 4 hrs drive",TC)],
        [p("Lake Nakuru",TCB), p("Flamingo / Rhino",TC), p("Year-round\nBest: Nov–Jan",TC),
         p("Lake Nakuru National Park",TC), p("~160 km | 2.5 hrs drive",TC)],
        [p("Diani Beach",TCB), p("Indian Ocean / Reef",TC), p("Jan–Mar\nJun–Sep",TC),
         p("South Coast, Kwale County",TC), p("~490 km | 1 hr flight",TC)],
        [p("Zanzibar",TCB), p("Island / Spice & Beach",TC), p("Jun–Oct\nDec–Feb",TC),
         p("Stone Town + Nungwi Beach, Tanzania",TC), p("~1 hr flight from NBO",TC)],
    ]
    el.append(tbl(d, [3.2*cm,3.2*cm,3.2*cm,4.0*cm,3.8*cm]))
    el += [sp(5), p("Destination Image References (URLs for content creation)", H3)]
    refs = [
        ("Masai Mara — Wildebeest River Crossing",
         "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600"),
        ("Amboseli — Elephants & Mount Kilimanjaro",
         "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1600"),
        ("Diani Beach — Aerial Indian Ocean View",
         "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1600"),
        ("Samburu — Reticulated Giraffe Close-Up",
         "https://images.unsplash.com/photo-1567963462974-e4a9d4f99b31?w=1600"),
        ("Zanzibar — Stone Town Carved Door Architecture",
         "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600"),
    ]
    for cap, url in refs:
        el += [p(f"[IMG] {cap}:", CAP), p(f"<font color='#1565C0'><u>{url}</u></font>", LINK), sp(2)]
    el.append(PageBreak())
    return el

# ═══════════════════════════════════════════════════════════════════════════
# PAGE 2 — Safari Package Master Comparison (7 cols → 17.4 cm)
# ═══════════════════════════════════════════════════════════════════════════
def page2():
    el = []
    el += [p("Safari Package Master Comparison", H1),
           p("All packages include airport transfers, 4×4 vehicle, professional guide, full-board meals & park fees unless noted.", CAP),
           hr(), sp(2)]

    # cols: Name(3.2) Duration(1.5) Parks(3.0) Price(2.2) GroupSz(1.4) Accommodation(2.8) URL(3.3) = 17.4
    hdr = [p("PACKAGE NAME",TH), p("DURATION",TH), p("PARKS COVERED",TH),
           p("PRICE\n/PAX",TH), p("GROUP\nSIZE",TH), p("ACCOMMODATION",TH), p("ITINERARY URL",TH)]
    rows = [
        [p("The Mara Majesty",TCB), p("3D/2N",TC), p("Masai Mara NR",TC),
         p("$850",TCV), p("2–12",TC), p("3★ Bush Camp or\n4★ Tented Lodge",TC),
         p("…vercel.app/package/\nmara-majesty",TCL)],

        [p("Amboseli Elephant Trail",TCB), p("4D/3N",TC), p("Amboseli NP",TC),
         p("$1,100",TCV), p("2–10",TC), p("Amboseli Serena\n4★ Lodge",TC),
         p("…vercel.app/package/\namboseli-elephants",TCL)],

        [p("Samburu Wilderness Explorer",TCB), p("5D/4N",TC),
         p("Samburu NR +\nBuffalo Springs",TC),
         p("$1,450",TCV), p("2–8",TC), p("Samburu Serenade\nCamp 4★",TC),
         p("…vercel.app/package/\nsamburu-wilderness",TCL)],

        [p("Lakes & Lions",TCB), p("6D/5N",TC), p("L. Nakuru NP +\nMasai Mara NR",TC),
         p("$1,980",TCV), p("2–12",TC), p("3★ Nakuru +\n4★ Mara Tented",TC),
         p("…vercel.app/package/\nlakes-and-lions",TCL)],

        [p("Beach & Bush Escape",TCB), p("10D/9N",TC),
         p("Masai Mara NR +\nDiani Beach",TC),
         p("$2,950",TCV), p("2–8",TC), p("4★ Mara Tented +\n4★ Diani Beachfront",TC),
         p("…vercel.app/package/\nbeach-bush-escape",TCL)],

        [p("Great Migration Epic",TCB), p("7D/6N",TC), p("Masai Mara NR\n(Migration Zones)",TC),
         p("$2,400",TCV), p("2–6",TC), p("5★ Luxury\nMigration Camp",TC),
         p("…vercel.app/package/\nmigration-epic",TCL)],

        [p("Tsavo Red Elephant Expedition",TCB), p("4D/3N",TC),
         p("Tsavo East NP +\nTsavo West NP",TC),
         p("$1,250",TCV), p("2–12",TC), p("3★ Tsavo\nWilderness Lodge",TC),
         p("…vercel.app/package/\ntsavo-red",TCL)],

        [p("Peak & Plains Adventure",TCB), p("8D/7N",TC),
         p("Amboseli NP +\nMasai Mara NR +\nL. Naivasha",TC),
         p("$2,100",TCV), p("2–10",TC), p("Mix 3★ Amboseli +\n4★ Mara + Camp",TC),
         p("…vercel.app/package/\npeak-plains",TCL)],

        [p("Rift Valley Explorer",TCB), p("2D/1N",TC), p("L. Naivasha +\nHell's Gate NP",TC),
         p("$450",TCV), p("2–15",TC), p("3★ Naivasha\nLakeside Resort",TC),
         p("…vercel.app/package/\nrift-valley-explorer",TCL)],

        [p("The Kenyan Grandeur",TCB), p("14D/13N",TC),
         p("Amboseli + Tsavo +\nMara + Samburu +\nDiani Beach",TC),
         p("$4,800",TCV), p("2–6",TC), p("Premium 4★–5★\nthroughout",TC),
         p("…vercel.app/package/\nkenyan-grandeur",TCL)],
    ]
    # highlight price col green background
    extra = [
        ("BACKGROUND", (3,1), (3,-1), PALE_GREEN),
        ("ALIGN",       (0,1), (-1,-1), "LEFT"),
    ]
    el.append(tbl([hdr]+rows, [3.2*cm,1.5*cm,3.0*cm,2.2*cm,1.4*cm,2.8*cm,3.3*cm], extra))

    el += [sp(4),
           p("Full URLs: https://euser-safari-web.vercel.app/package/<slug> — see column above for each slug.", NOTE),
           p("Single supplement: +25%.  Prices valid Jan–Dec 2025.  Non-resident park fees INCLUDED.", NOTE)]

    # ── Seasonal Pricing Grid ──────────────────────────────────────────────
    el += [sp(6), p("Seasonal Pricing Tiers (Per Person Sharing)", H2), hr(0.4, PALE_GREEN)]
    # cols: 4.2 + 3.0 + 3.0 + 3.0 + 4.2 = 17.4
    sh = [p("PACKAGE",TH), p("LOW SEASON\n(Apr–Jun, Nov)",TH),
          p("SHOULDER\n(Jan–Mar, Dec)",TH), p("HIGH SEASON\n(Jul–Oct)",TH),
          p("PEAK / MIGRATION\n(Aug–Sep only)",TH)]
    sr = [
        [p("Mara Majesty (3D)",TCB),         p("$680",TC), p("$780",TC),  p("$850",TCV),  p("$980",TCV)],
        [p("Amboseli Elephant Trail (4D)",TCB), p("$880",TC), p("$980",TC), p("$1,100",TCV), p("$1,250",TCV)],
        [p("Samburu Wilderness (5D)",TCB),    p("$1,150",TC),p("$1,280",TC),p("$1,450",TCV),p("$1,620",TCV)],
        [p("Lakes & Lions (6D)",TCB),         p("$1,580",TC),p("$1,750",TC),p("$1,980",TCV),p("$2,200",TCV)],
        [p("Beach & Bush Escape (10D)",TCB),  p("$2,350",TC),p("$2,650",TC),p("$2,950",TCV),p("$3,300",TCV)],
        [p("Great Migration Epic (7D)",TCB),  p("N/A*",TC),  p("$2,100",TC),p("$2,400",TCV),p("$2,800",TCV)],
        [p("Tsavo Red Elephant (4D)",TCB),    p("$980",TC),  p("$1,100",TC),p("$1,250",TCV),p("$1,380",TCV)],
        [p("Peak & Plains Adv. (8D)",TCB),    p("$1,650",TC),p("$1,880",TC),p("$2,100",TCV),p("$2,350",TCV)],
        [p("Rift Valley Explorer (2D)",TCB),  p("$360",TC),  p("$400",TC),  p("$450",TCV),  p("$500",TCV)],
        [p("The Kenyan Grandeur (14D)",TCB),  p("$3,800",TC),p("$4,300",TC),p("$4,800",TCV),p("$5,500",TCV)],
    ]
    sex = [
        ("BACKGROUND", (4,1),(4,-1), HexColor("#FFF3E0")),
        ("TEXTCOLOR",  (4,1),(4,-1), DARK_AMBER),
        ("FONTNAME",   (4,1),(4,-1), "Helvetica-Bold"),
        ("ALIGN",      (0,1),(-1,-1),"CENTER"),
    ]
    el.append(tbl([sh]+sr, [4.2*cm,3.0*cm,3.0*cm,3.0*cm,4.2*cm], sex))
    el += [sp(3), p("* Great Migration Epic not available Apr–Jun (off-season migration corridors).", NOTE)]
    el.append(PageBreak())
    return el

# ═══════════════════════════════════════════════════════════════════════════
# PAGE 3 — Group Discounts, Child Rates & Park Entry Fees
# ═══════════════════════════════════════════════════════════════════════════
def page3():
    el = []
    el += [p("Group Discounts, Child Rates & Park Entry Fees", H1), hr(), sp(3)]

    # A — Group discounts  3.5+3.0+6.4+4.5 = 17.4
    el += [p("A. Group Size Discounts", H2), hr(0.4, PALE_GREEN)]
    gd = [
        [p("TRAVELLERS",TH), p("DISCOUNT",TH), p("EXAMPLE (High-Season Mara Majesty $850)",TH), p("EFFECTIVE PRICE",TH)],
        [p("2 pax",TCB),       p("Base rate",TC), p("2 × $850",TC),          p("$850.00 / pax",TCV)],
        [p("3–4 pax",TCB),     p("5% off",TC),    p("4 × $850 × 0.95",TC),   p("$807.50 / pax",TCV)],
        [p("5–6 pax",TCB),     p("10% off",TC),   p("6 × $850 × 0.90",TC),   p("$765.00 / pax",TCV)],
        [p("7–10 pax",TCB),    p("15% off",TC),   p("8 × $850 × 0.85",TC),   p("$722.50 / pax",TCV)],
        [p("11–15 pax",TCB),   p("20% off",TC),   p("12 × $850 × 0.80",TC),  p("$680.00 / pax",TCV)],
        [p("16+ pax (Corp.)",TCB), p("Custom quote",TC), p("Contact bookings team",TC), p("TBD",TCV)],
    ]
    el.append(tbl(gd, [3.5*cm,3.0*cm,6.4*cm,4.5*cm]))

    # B — Child / Youth pricing  2.5+2.2+3.2+3.2+2.5+3.8 = 17.4
    el += [sp(6), p("B. Child & Youth Age-Bracket Pricing", H2), hr(0.4, PALE_GREEN)]
    cd = [
        [p("AGE BRACKET",TH), p("RATE vs ADULT",TH), p("PARK FEE\n(Non-Res/day)",TH),
         p("EXAMPLE\n(Adult base: $850)",TH), p("CHILD TOTAL",TH), p("NOTES",TH)],
        [p("Infant  0–2 yrs",TCB),  p("FREE",TCV),          p("Free",TC),
         p("$850 × 0%",TC),  p("$0",TCV),          p("Share parents' bed; no vehicle seat",TC)],
        [p("Child   3–11 yrs",TCB), p("50% of adult",TCV),  p("$50/day premium\n$30/day standard",TC),
         p("$850 × 50%",TC), p("$425 + park fees",TCV), p("Separate lodge bed; child seat",TC)],
        [p("Youth  12–17 yrs",TCB), p("75% of adult",TCV),  p("$80/day premium\n$50/day standard",TC),
         p("$850 × 75%",TC), p("$637.50 + fees",TCV), p("Full room; adult park fee applies",TC)],
        [p("Adult  18+ yrs",TCB),   p("100% full rate",TCV),p("$100/day premium\n$75/day standard",TC),
         p("$850 × 100%",TC),p("$850 + park fees",TCV),p("Park fees included in package",TC)],
        [p("Senior  60+ yrs",TCB),  p("95% of adult",TCV),  p("$100/day premium\n$75/day standard",TC),
         p("$850 × 95%",TC), p("$807.50 + fees",TCV),p("5% senior disc. on accommodation",TC)],
    ]
    el.append(tbl(cd, [2.5*cm,2.2*cm,3.2*cm,3.2*cm,2.5*cm,3.8*cm]))

    # C — Park fees  3.0+1.8+1.7+1.7+1.7+1.7+1.6+4.2 = 17.4
    el += [sp(6), p("C. Kenya National Park & Reserve Entry Fees — 2025 Rates (Per Person/Day)", H2),
           hr(0.4, PALE_GREEN)]
    pf = [
        [p("PARK / RESERVE",TH), p("TIER",TH),
         p("NON-RES\nADULT",TH), p("NON-RES\nCHILD",TH),
         p("CITIZEN\nADULT",TH), p("CITIZEN\nCHILD",TH),
         p("VEHICLE\nFEE",TH), p("NOTES",TH)],
        [p("Masai Mara NR",TCB),   p("Premium",TC), p("$100",TCV), p("$50",TC),
         p("KES 1,000",TC), p("KES 500",TC), p("KES 200",TC),
         p("Conservation levy applies on top",TC)],
        [p("Amboseli NP",TCB),     p("Premium",TC), p("$80",TCV),  p("$40",TC),
         p("KES 600",TC),   p("KES 300",TC), p("KES 200",TC),
         p("KWS direct; credit card accepted",TC)],
        [p("Tsavo East NP",TCB),   p("Standard",TC),p("$52",TCV),  p("$26",TC),
         p("KES 400",TC),   p("KES 200",TC), p("KES 150",TC),
         p("Combined Tsavo East/West ticket",TC)],
        [p("Tsavo West NP",TCB),   p("Standard",TC),p("$52",TCV),  p("$26",TC),
         p("KES 400",TC),   p("KES 200",TC), p("KES 150",TC),
         p("Combined Tsavo East/West ticket",TC)],
        [p("Samburu NR",TCB),      p("Standard+",TC),p("$65",TCV), p("$35",TC),
         p("KES 500",TC),   p("KES 250",TC), p("KES 200",TC),
         p("County council levy billed separately",TC)],
        [p("Lake Nakuru NP",TCB),  p("Standard",TC),p("$55",TCV),  p("$28",TC),
         p("KES 400",TC),   p("KES 200",TC), p("KES 150",TC),
         p("Rhino sanctuary surcharge: $10/pax",TC)],
        [p("Hell's Gate NP",TCB),  p("Budget",TC),  p("$26",TCV),  p("$15",TC),
         p("KES 350",TC),   p("KES 150",TC), p("KES 100",TC),
         p("Cycling allowed; gorge walk extra",TC)],
        [p("L. Naivasha (Crescent Is.)",TCB), p("Private",TC), p("$30",TCV), p("$20",TC),
         p("KES 400",TC),   p("KES 200",TC), p("N/A",TC),
         p("Walking island; boat hire separate",TC)],
    ]
    pfx = [("ALIGN",(2,1),(5,-1),"CENTER"), ("BACKGROUND",(2,1),(3,-1),PALE_GREEN)]
    el.append(tbl(pf, [3.0*cm,1.8*cm,1.7*cm,1.7*cm,1.7*cm,1.7*cm,1.6*cm,4.2*cm], pfx))
    el.append(PageBreak())
    return el

# ═══════════════════════════════════════════════════════════════════════════
# PAGE 4 — Inclusions Matrix (10 packages × 16 rows)
# ═══════════════════════════════════════════════════════════════════════════
def page4():
    el = []
    el += [p("Package Inclusions & Exclusions Matrix", H1),
           p("Tick = Included  |  x = Excluded  |  Add-on = Available at extra cost", CAP),
           hr(), sp(3)]

    # label(3.8) + 10 cols × 1.36 = 3.8+13.6 = 17.4 cm
    COL = 1.36*cm
    hdr = [p("INCLUSION / EXCLUSION",TH),
           p("Mara\nMajesty",TH), p("Amboseli\nElephant",TH),
           p("Samburu\nWild.",TH), p("Lakes &\nLions",TH),
           p("Beach &\nBush",TH), p("Migration\nEpic",TH),
           p("Tsavo\nRed",TH), p("Peak &\nPlains",TH),
           p("Rift Vly\nExplorer",TH), p("Kenyan\nGrandeur",TH)]

    Y = p("Tick",TC)
    N = p("x",TC)
    A = p("Add-on",TC)

    def row(label, *vals):
        return [p(label, TCB)] + [p(v,TC) for v in vals]

    rows = [
        row("Airport/Hotel Transfers",        "Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick"),
        row("4x4 Safari Vehicle",              "Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick"),
        row("Professional Safari Guide",       "Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick"),
        row("All Meals (Full Board)",          "Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick"),
        row("Park / Reserve Entry Fees",       "Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick"),
        row("Drinking Water in Vehicle",       "Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick","Tick"),
        row("Bush Breakfast",                  "x","x","Tick","x","Tick","Tick","x","Tick","x","Tick"),
        row("Maasai Village Visit",            "Tick","x","x","Tick","Tick","Tick","x","x","x","Tick"),
        row("Hot-Air Balloon Safari",          "Add-on","x","x","x","Add-on","Add-on","x","Add-on","x","Add-on"),
        row("Beach / Water Activities",        "x","x","x","Boat","Snorkel","x","x","Boat","Boat","Full"),
        row("SGR Train Ticket",                "x","x","x","x","Tick","x","x","x","x","Tick"),
        row("Photography Guide Upgrade",       "Add-on","Add-on","Add-on","Add-on","Add-on","Add-on","Add-on","Add-on","Add-on","Add-on"),
        row("International Flights",           "x","x","x","x","x","x","x","x","x","x"),
        row("Visa Fees",                       "x","x","x","x","x","x","x","x","x","x"),
        row("Travel Insurance",                "x","x","x","x","x","x","x","x","x","x"),
        row("Tips / Gratuities",               "x","x","x","x","x","x","x","x","x","x"),
    ]
    # colour Tick rows green text, x rows grey text
    inc_style = [
        ("ALIGN",    (1,0),(-1,-1), "CENTER"),
        ("FONTSIZE", (0,0),(-1,-1), 7),
        ("FONTSIZE", (0,0),(0,-1),  7.5),
    ]
    el.append(tbl([hdr]+rows, [3.8*cm]+[COL]*10, inc_style))

    # ── Add-Ons table  4.5+2.0+2.0+4.0+4.9 = 17.4
    el += [sp(6), p("Add-On Experiences & Pricing", H2), hr(0.4, PALE_GREEN)]
    ao = [
        [p("ADD-ON EXPERIENCE",TH), p("DURATION",TH), p("PRICE/PAX",TH),
         p("AVAILABILITY",TH), p("NOTES",TH)],
        [p("Hot-Air Balloon — Masai Mara",TCB), p("~1.5 hr dawn",TC), p("$450",TCV),
         p("Year-round (best Jul–Oct)",TC), p("Champagne breakfast incl.; book 30+ days ahead",TC)],
        [p("Private Bush Dinner — Mara",TCB),   p("3–4 hrs eve.",TC), p("$120",TCV),
         p("Year-round; min 2 pax",TC), p("3-course candlelit dinner in the bush",TC)],
        [p("Gorilla Trekking Permit — Rwanda",TCB), p("Full day",TC), p("$1,500",TCV),
         p("Year-round; slots limited",TC), p("Government permit; book 6+ months ahead",TC)],
        [p("Helicopter Transfer — NBO→Mara",TCB), p("~40 min flight",TC), p("$620",TCV),
         p("Year-round; min 2 seats",TC), p("Private charter; scenic Rift Valley route",TC)],
        [p("PADI Intro Dive — Diani/Watamu",TCB), p("Half day",TC), p("$95",TCV),
         p("Best Jun–Sep",TC), p("Certified instructor; equipment included",TC)],
        [p("Photography Guide Upgrade",TCB), p("Per safari day",TC), p("$75/day",TCV),
         p("Year-round",TC), p("Specialist wildlife photographer co-guides game drive",TC)],
    ]
    el.append(tbl(ao, [4.5*cm,2.0*cm,2.0*cm,4.0*cm,4.9*cm]))
    el.append(PageBreak())
    return el

# ═══════════════════════════════════════════════════════════════════════════
# PAGE 5 — Beach Packages, International Tours & Contacts
# ═══════════════════════════════════════════════════════════════════════════
def page5():
    el = []
    el += [p("Beach Packages, International Extensions & Contacts", H1),
           hr(), sp(3)]

    # A — Beach Packages  3.0+2.2+1.4+4.0+2.5+4.3 = 17.4
    el += [p("A. Beach Holiday Packages — Kenyan Coast & Islands", H2), hr(0.4, PALE_GREEN)]
    bp = [
        [p("PACKAGE",TH), p("DESTINATION",TH), p("DURATION",TH),
         p("HOTEL OPTIONS (by tier)",TH), p("PRICE/PAX",TH), p("KEY INCLUSIONS",TH)],
        [p("Diani Beach Bliss",TCB), p("Diani, Kwale",TC), p("5D/4N",TC),
         p("Budget: Diani Reef 3★\nMid: Leopard Beach 4★\nLuxury: Baobab Beach 5★",TC),
         p("$480–$920",TCV),
         p("B&B, transfers, snorkelling, dhow cruise",TC)],
        [p("Watamu & Malindi Escape",TCB), p("Watamu Marine NP",TC), p("6D/5N",TC),
         p("Budget: Turtle Bay 3★\nMid: Hemingways 4★\nLuxury: The Sands 5★",TC),
         p("$550–$1,100",TCV),
         p("All meals, glass-bottom boat, sea turtle visit",TC)],
        [p("Lamu Island Cultural Escape",TCB), p("Lamu Island",TC), p("5D/4N",TC),
         p("Boutique: Peponi Hotel\nor Lamu House",TC),
         p("$700–$1,350",TCV),
         p("Dhow sailing, donkey safari, Swahili cooking class",TC)],
        [p("Zanzibar Spice Retreat",TCB), p("Zanzibar, Tanzania",TC), p("7D/6N",TC),
         p("Budget: Breezes 3★\nMid: Gold Zanzibar 4★\nLuxury: Zuri 5★",TC),
         p("$850–$1,800",TCV),
         p("Spice tour, Stone Town UNESCO walk, snorkelling",TC)],
        [p("Mombasa City + Beach",TCB), p("Mombasa + S. Coast",TC), p("4D/3N",TC),
         p("Mid: Sarova Whitesands 4★\nLuxury: Serena Beach 5★",TC),
         p("$420–$780",TCV),
         p("Fort Jesus tour, Old Town walk, SGR transfer incl.",TC)],
    ]
    el.append(tbl(bp, [3.0*cm,2.2*cm,1.4*cm,4.0*cm,2.5*cm,4.3*cm]))

    # B — International  3.5+3.0+1.5+5.0+2.2+2.2 = 17.4
    el += [sp(5), p("B. International Extension Packages", H2), hr(0.4, PALE_GREEN)]
    ip = [
        [p("PACKAGE",TH), p("COUNTRIES",TH), p("DURATION",TH),
         p("HIGHLIGHTS",TH), p("PRICE/PAX",TH), p("URL SLUG",TH)],
        [p("East Africa Grand Loop",TCB), p("Kenya+Tanzania+Rwanda",TC), p("14D/13N",TC),
         p("Masai Mara + Serengeti + Ngorongoro + Gorilla Trek",TC),
         p("$5,800",TCV), p("east-africa-grand",TCL)],
        [p("Gorilla & Safari Combo",TCB), p("Kenya+Uganda/Rwanda",TC), p("10D/9N",TC),
         p("Masai Mara Big 5 + Bwindi gorilla trek + L. Victoria",TC),
         p("$4,200",TCV), p("gorilla-safari",TCL)],
        [p("Southern Africa Explorer",TCB), p("Kenya+Botswana+Zimbabwe",TC), p("14D/13N",TC),
         p("Mara + Okavango Delta + Chobe NP + Victoria Falls",TC),
         p("$7,500",TCV), p("southern-africa",TCL)],
        [p("Kilimanjaro & Safari",TCB), p("Kenya+Tanzania",TC), p("10D/9N",TC),
         p("Mara safari + Kilimanjaro Marangu Route + Ngorongoro",TC),
         p("$4,800",TCV), p("kili-safari",TCL)],
    ]
    el.append(tbl(ip, [3.5*cm,3.0*cm,1.5*cm,5.0*cm,2.2*cm,2.2*cm]))

    # C — 10 Image References  ─────────────────────────────────────────────
    el += [sp(5), p("C. Image Reference Gallery (for video & content creation)", H2), hr(0.4, PALE_GREEN)]
    imgs = [
        ("[IMG-01] Wildebeest River Crossing — Masai Mara","https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600"),
        ("[IMG-02] Elephant Herd & Kilimanjaro — Amboseli","https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1600"),
        ("[IMG-03] Lion Pride on the Mara Savannah","https://images.unsplash.com/photo-1534476478-253ad21b3059?w=1600"),
        ("[IMG-04] Diani Beach Aerial — Indian Ocean","https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1600"),
        ("[IMG-05] Reticulated Giraffe — Samburu","https://images.unsplash.com/photo-1567963462974-e4a9d4f99b31?w=1600"),
        ("[IMG-06] Zanzibar Stone Town Carved Door","https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1600"),
        ("[IMG-07] Hot-Air Balloon Dawn — Masai Mara","https://images.unsplash.com/photo-1617196034183-421b4040d6a7?w=1600"),
        ("[IMG-08] Mountain Gorilla Family — Rwanda","https://images.unsplash.com/photo-1581852017103-68ac65514cf7?w=1600"),
        ("[IMG-09] Flamingos Pink Shoreline — Lake Nakuru","https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1600"),
        ("[IMG-10] Luxury Tented Camp Interior — Bush","https://images.unsplash.com/photo-1606574976-673c59f5a2aa?w=1600"),
    ]
    # 2-col table for image refs 5.5+11.9 = 17.4
    img_rows = [[p(cap,TCB), p(f'<font color="#1565C0"><u>{url}</u></font>',TCL)] for cap, url in imgs]
    el.append(tbl([[p("IMAGE REFERENCE",TH), p("UNSPLASH URL",TH)]]+img_rows, [5.5*cm,11.9*cm]))

    # D — Contact
    el += [sp(5), p("D. Booking & Contact Information", H2), hr(0.4, PALE_GREEN)]
    ct = [
        [p("CHANNEL",TH),     p("CONTACT DETAILS",TH),                          p("RESPONSE TIME",TH)],
        [p("Website",TCB),    p("https://euser-safari-web.vercel.app",TCL),       p("Instant AI chat",TC)],
        [p("Email",TCB),      p("hello@euserasafaris.com",TC),                   p("Within 2 hours (business hours)",TC)],
        [p("WhatsApp",TCB),   p("+254 720 123 456",TC),                          p("Within 30 minutes",TC)],
        [p("Head Office",TCB),p("The Hub Karen, Shop G18, Karen Rd, Nairobi",TC),p("Walk-in welcome Mon–Sat",TC)],
        [p("Branch",TCB),     p("Sarit Centre, 2nd Floor, Westlands, Nairobi",TC),p("Walk-in welcome Mon–Sat",TC)],
    ]
    el.append(tbl(ct, [3.0*cm, 9.4*cm, 5.0*cm]))
    return el

# ═══════════════════════════════════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════════════════════════════════
def build():
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "Euser_Safaris_Brand_Knowledge.pdf")
    doc = SimpleDocTemplate(
        out, pagesize=A4,
        leftMargin=LM, rightMargin=RM,
        topMargin=TM, bottomMargin=BM,
        title="Euser Safaris — Brand Knowledge Document",
        author="Euser Safaris Ltd",
        subject="Safari & Travel Packages Kenya 2025",
        keywords="safari kenya masai mara beach packages pricing",
    )
    story = page1() + page2() + page3() + page4() + page5()
    doc.build(story, onFirstPage=hf, onLaterPages=hf)
    print(f"[OK] PDF saved: {out}")

if __name__ == "__main__":
    build()
