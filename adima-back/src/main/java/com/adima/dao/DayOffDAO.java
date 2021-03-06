package com.adima.dao;

import java.util.Date;
import java.util.List;

import com.adima.entity.DayOff;

public interface DayOffDAO extends PersistentDAO<Long, DayOff> {
	List<DayOff> findByDate(Date beginDate, Date endDate, Long userId);

	void deleteByDate(Date beginDate, Long userId);
}