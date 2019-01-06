package com.adima.service;

import java.util.Date;
import java.util.List;

import com.adima.entity.DayOff;

public interface DayOffService {

    List<DayOff> findByDate(Date beginDate, Date endDate, Long userId);

    void create(Date date, Long userId);

    void delete(Date date, Long userId);
}