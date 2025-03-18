import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of readings', async () => {
    const readings = await service.getReadings(10);
    expect(readings.length).not.toBe(0);
  })

  it("should generate readings with specified length", async () => {
    const length = 100;
    expect(await service.getReadings(length)).toHaveSize(length);
  });

  it("should generate readings with timestamps and random values", async () => {
    const reading = (await service.getReadings(1))[0];

    expect(typeof reading.time).toBe("number");
    expect(typeof reading.value).toBe("number");
  });

  it("should generate readings by hours and ordered by time descending", async () => {
    const readings = await service.getReadings(4);

    expect(readings).toHaveSize(4);
    const OneHourInMilliseconds = 60 * 60 * 1000;
    expect(readings[0].time - readings[1].time).toBe(OneHourInMilliseconds);
    expect(readings[1].time - readings[2].time).toBe(OneHourInMilliseconds);
    expect(readings[2].time - readings[3].time).toBe(OneHourInMilliseconds);
  });

  it("should generate start reading realtime chart", async () => {
    expect(await service.getRealTimeReadings()).toHaveSize(1);
  });

  it("should generate add reading realtime chart", async () => {
    expect(await service.addReading()).toHaveSize(1);
  });
});
