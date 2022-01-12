package app.service;

import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DateRangeService {

    public boolean datesOverlap(Date startTimeFirst, Date endTimeFirst, Date startTimeSecond, Date endTimeSecond)
    {

        return ((startTimeFirst.compareTo(endTimeSecond) <= 0)
                && (startTimeSecond.compareTo(endTimeFirst) <= 0));
    }
}
