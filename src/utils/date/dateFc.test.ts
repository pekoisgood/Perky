import { getTime, getFormattedDate, calculateCountPerDay } from "./dateFc";

describe("getTime()", () => {
  it("returns the formatted time with minutes in the evening", () => {
    const date = new Date("2023-07-24T21:45:00");
    const showMinutes = true;
    const formattedTime = getTime(date, showMinutes);
    expect(formattedTime).toBe("2023/07/24 21:45");
  });

  it("returns the formatted time without minutes in the morning", () => {
    const date = new Date("2023-07-24T08:00:00");
    const showMinutes = false;
    const formattedTime = getTime(date, showMinutes);
    expect(formattedTime).toBe("2023/07/24");
  });

  it("returns the formatted time with single-digit month, day, hour, and minute in the afternoon", () => {
    const date = new Date("2023-03-05T14:09:00");
    const showMinutes = true;
    const formattedTime = getTime(date, showMinutes);
    expect(formattedTime).toBe("2023/03/05 14:09");
  });

  it("returns the formatted time with single-digit month, day, and hour without minutes in the evening", () => {
    const date = new Date("2023-12-10T19:00:00");
    const showMinutes = false;
    const formattedTime = getTime(date, showMinutes);
    expect(formattedTime).toBe("2023/12/10");
  });
});

describe("getFormattedDate()", () => {
  it("should return a formated date in DD. MM YY. at HH:MM", () => {
    expect(getFormattedDate(new Date("2023,01,01"))).toBe(
      "1. January 2023. at 00:00",
    );
  });
  it("returns the formatted date with full year", () => {
    const date = new Date("2023-07-24T12:30:00");
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).toBe("24. July 2023. at 12:30");
  });

  it("returns the formatted date with hidden year", () => {
    const date = new Date("2023-07-24T12:30:00");
    const formattedDate = getFormattedDate(date, true);
    expect(formattedDate).toBe("24. July at 12:30");
  });

  it("returns the formatted date with single-digit day and minutes with full year", () => {
    const date = new Date("2023-07-05T08:05:00");
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).toBe("5. July 2023. at 08:05");
  });

  it("returns the formatted date with single-digit day and minutes with hidden year", () => {
    const date = new Date("2023-07-05T08:05:00");
    const formattedDate = getFormattedDate(date, true);
    expect(formattedDate).toBe("5. July at 08:05");
  });
});

describe("calculateCountPerDay", () => {
  it("returns an empty array for empty input arrays", () => {
    const labels: string[] = [];
    const filteredRecord: Date[] = [];
    const result = calculateCountPerDay(labels, filteredRecord);
    expect(result).toEqual([]);
  });

  it("returns an array of zeros for no matching dates", () => {
    const labels = ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"];
    const filteredRecord: Date[] = [
      new Date("2023-01-05"),
      new Date("2023-01-06"),
    ];
    const result = calculateCountPerDay(labels, filteredRecord);
    expect(result).toEqual([0, 0, 0, 0, 1, 1, 0]);
  });

  it("returns the correct counts for some matching dates", () => {
    const labels = ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"];
    const filteredRecord: Date[] = [
      new Date("2023-01-01"),
      new Date("2023-01-01"),
      new Date("2023-01-02"),
      new Date("2023-01-03"),
    ];
    const result = calculateCountPerDay(labels, filteredRecord);
    expect(result).toEqual([2, 1, 1, 0, 0, 0, 0]);
  });

  it("returns the correct counts for all matching dates", () => {
    const labels = ["1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7"];
    const filteredRecord: Date[] = [
      new Date("2023-01-01"),
      new Date("2023-01-01"),
      new Date("2023-01-02"),
      new Date("2023-01-03"),
      new Date("2023-01-03"),
    ];
    const result = calculateCountPerDay(labels, filteredRecord);
    expect(result).toEqual([2, 1, 2, 0, 0, 0, 0]);
  });
});
