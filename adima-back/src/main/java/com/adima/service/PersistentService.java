package com.adima.service;

import java.io.Serializable;
import java.util.List;

import com.adima.entity.AbstractEntity;

public interface PersistentService<K extends Serializable, T extends AbstractEntity> {
	T findById(K id);

	K save(T entity);

	void saveOrUpdate(T entity);

	void delete(T entity);

	List<T> findAll();
}
