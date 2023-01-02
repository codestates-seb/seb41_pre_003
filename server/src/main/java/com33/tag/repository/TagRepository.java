package com33.tag.repository;


import com33.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<List<Tag>> findByTagNameContaining(String tagName);

    Tag findByTagId(Long tagId);

    Optional<Tag> findByTagName(String tagName);


    List<Tag> findByTagCountGreaterThan(int tagCount);
}