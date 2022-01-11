package app.service;

import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DateRangeService {

    public boolean DatesOverlap(Date startTimeFirst, Date endTimeFirst, Date startTimeSecond, Date endTimeSecond)
    {

        if ((startTimeFirst.compareTo(endTimeSecond) <= 0)
                && startTimeSecond.compareTo(endTimeFirst) <= 0) {
            return true;
        }

        return false;
    }
}
