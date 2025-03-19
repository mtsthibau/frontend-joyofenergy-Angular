import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should format date label", () => {
    expect(component.formatDateLabel(new Date(2021, 0, 1).getTime())).toBe("01/01");
    expect(component.formatDateLabel(new Date(2021, 1, 1).getTime())).toBe("01/02");
    expect(component.formatDateLabel(new Date(2021, 5, 1).getTime())).toBe("01/06");
    expect(component.formatDateLabel(new Date(2021, 11, 1).getTime())).toBe("01/12");
    expect(component.formatDateLabel(new Date(2021, 11, 25).getTime())).toBe("25/12");
    expect(component.formatDateLabel(new Date(2021, 11, 31).getTime())).toBe("31/12");
  });
});
