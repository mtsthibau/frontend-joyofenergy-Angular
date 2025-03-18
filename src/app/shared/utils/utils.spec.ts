import { groupByDay, sortByTime } from "./utils";

describe("#reading", function () {
  describe("#groupedByDay", () => {
    it("should get readings with timestamps and values", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 16, 10, 34).getTime(),
          value: 35,
        },
      ];

      const groupedReadings = groupByDay(readings);
      expect(groupedReadings).toHaveSize(2);
      expect(typeof groupedReadings[0].time).toBe("number");
      expect(typeof groupedReadings[0].value).toBe("number");
    });

    it("should get readings grouped by day", async () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 16, 10, 34).getTime(),
          value: 35,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ];

      const groupedReadings = groupByDay(readings);
      expect(groupedReadings).toHaveSize(3);
      expect(
        groupedReadings.find(
          (reading) => reading.time === new Date(2021, 12, 17).getTime()
        ).value
      ).toBe(90);
      expect(
        groupedReadings.find(
          (reading) => reading.time === new Date(2021, 12, 16).getTime()
        ).value
      ).toBe(35);
    });
  });

  describe("#sortByTime", () => {
    it("should put latest reading to the last", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 17, 11, 34).getTime(),
          value: 35,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ];

      const sortedReading = sortByTime(readings);
      expect(sortedReading).toHaveSize(4);
      expect(sortedReading[0]).toEqual({
        time: new Date(2021, 12, 15, 11, 34).getTime(),
        value: 25,
      });
      expect(sortedReading[3]).toEqual({
        time: new Date(2021, 12, 17, 11, 34).getTime(),
        value: 35,
      });
    });

    it("should not change original array", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ];

      sortByTime(readings);
      expect(readings).toHaveSize(3);
      expect(readings).toEqual([
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ]);
    });
  });

});
