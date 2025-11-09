import styles from "./page.module.css";

const hall = { width: 12, length: 24 };
const room = { width: 12, length: 11 };
const stair = { width: 4, length: 8 };
const walkwayGap = 2;

const totalWidthFt = room.width * 2 + hall.width;
const totalLengthFt = hall.length;

type Shape = {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  className: string;
};

const shapes: Shape[] = [
  {
    label: "Left Room A\n12′ × 11′",
    x: 0,
    y: 0,
    width: room.width,
    height: room.length,
    className: styles.room,
  },
  {
    label: "Left Room B\n12′ × 11′",
    x: 0,
    y: room.length + walkwayGap,
    width: room.width,
    height: room.length,
    className: styles.room,
  },
  {
    label: "Hall\n24′ × 12′",
    x: room.width,
    y: 0,
    width: hall.width,
    height: hall.length,
    className: styles.hall,
  },
  {
    label: "Right Room A\n12′ × 11′",
    x: room.width + hall.width,
    y: 0,
    width: room.width,
    height: room.length,
    className: styles.room,
  },
  {
    label: "Right Room B\n12′ × 11′",
    x: room.width + hall.width,
    y: room.length + walkwayGap,
    width: room.width,
    height: room.length,
    className: styles.room,
  },
  {
    label: "Staircase",
    x: room.width + hall.width - stair.width,
    y: hall.length - stair.length,
    width: stair.width,
    height: stair.length,
    className: styles.stair,
  },
];

const dimensionMarkers = [
  {
    orientation: "horizontal" as const,
    length: totalWidthFt,
    start: { x: 0, y: totalLengthFt + 1 },
    end: { x: totalWidthFt, y: totalLengthFt + 1 },
    label: `${totalWidthFt}′ total width`,
  },
  {
    orientation: "vertical" as const,
    length: totalLengthFt,
    start: { x: totalWidthFt + 1, y: 0 },
    end: { x: totalWidthFt + 1, y: totalLengthFt },
    label: `${totalLengthFt}′ total length`,
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Ground Floor Layout</h1>
          <p>
            Central hall 24′ × 12′ flanked by pairs of 12′ × 11′ rooms on both
            sides. Staircase rises from the south-east hall corner to the upper
            level. Floor-to-ceiling height: 11.6′.
          </p>
        </header>

        <section className={styles.canvasWrapper}>
          <svg
            className={styles.plan}
            viewBox={`-5 -5 ${totalWidthFt + 12} ${totalLengthFt + 12}`}
            role="img"
            aria-labelledby="planTitle planDesc"
          >
            <title id="planTitle">
              Ground floor plan with central hall and side rooms
            </title>
            <desc id="planDesc">
              Diagram showing a 24 by 12 foot hall centered between two pairs of
              12 by 11 foot rooms with a staircase in the south-east corner of
              the hall.
            </desc>

            <defs>
              <pattern
                id="stairsPattern"
                patternUnits="userSpaceOnUse"
                width="1"
                height="1"
              >
                <rect width="1" height="1" fill="#e2e8f0" />
                <path
                  d="M0,1 H1"
                  stroke="#0f172a"
                  strokeWidth="0.1"
                  strokeLinecap="square"
                />
              </pattern>
            </defs>

            <rect
              x={0}
              y={0}
              width={totalWidthFt}
              height={totalLengthFt}
              className={styles.buildingOutline}
            />

            {shapes.map((shape) => (
              <g
                key={shape.label}
                transform={`translate(${shape.x}, ${shape.y})`}
              >
                <rect
                  className={shape.className}
                  width={shape.width}
                  height={shape.height}
                />
                <text
                  className={styles.label}
                  x={shape.width / 2}
                  y={shape.height / 2}
                >
                  {shape.label.split("\n").map((line, index) => (
                    <tspan
                      key={`${shape.label}-${index}`}
                      x={shape.width / 2}
                      dy={index === 0 ? "0" : "1.2em"}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            ))}

            {dimensionMarkers.map((marker) => {
              if (marker.orientation === "horizontal") {
                return (
                  <g key={marker.label} className={styles.dimensionGroup}>
                    <line
                      x1={marker.start.x}
                      y1={marker.start.y}
                      x2={marker.end.x}
                      y2={marker.end.y}
                    />
                    <line
                      x1={marker.start.x}
                      y1={marker.start.y - 1}
                      x2={marker.start.x}
                      y2={marker.start.y + 1}
                    />
                    <line
                      x1={marker.end.x}
                      y1={marker.end.y - 1}
                      x2={marker.end.x}
                      y2={marker.end.y + 1}
                    />
                    <text
                      className={styles.dimensionLabel}
                      x={(marker.start.x + marker.end.x) / 2}
                      y={marker.start.y + 2}
                    >
                      {marker.label}
                    </text>
                  </g>
                );
              }

              return (
                <g key={marker.label} className={styles.dimensionGroup}>
                  <line
                    x1={marker.start.x}
                    y1={marker.start.y}
                    x2={marker.end.x}
                    y2={marker.end.y}
                  />
                  <line
                    x1={marker.start.x - 1}
                    y1={marker.start.y}
                    x2={marker.start.x + 1}
                    y2={marker.start.y}
                  />
                  <line
                    x1={marker.end.x - 1}
                    y1={marker.end.y}
                    x2={marker.end.x + 1}
                    y2={marker.end.y}
                  />
                  <text
                    className={styles.dimensionLabel}
                    x={marker.start.x + 0.5}
                    y={(marker.start.y + marker.end.y) / 2}
                    transform={`rotate(-90 ${marker.start.x + 0.5} ${
                      (marker.start.y + marker.end.y) / 2
                    })`}
                  >
                    {marker.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </section>

        <section className={styles.specs}>
          <div>
            <h2>Key Dimensions</h2>
            <ul>
              <li>Hall: 24′ length × 12′ width</li>
              <li>Rooms: Four rooms, each 12′ × 11′</li>
              <li>Total building footprint: {totalWidthFt}′ × {totalLengthFt}′</li>
              <li>Floor-to-ceiling height: 11.6′</li>
            </ul>
          </div>
          <div>
            <h2>Notes</h2>
            <ul>
              <li>
                Central hall allows direct access to each room with a 2′ service
                gap midway.
              </li>
              <li>
                Staircase positioned in the south-east hall corner for vertical
                circulation.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
