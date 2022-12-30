package com33.tag.mapper;

import com33.tag.dto.TagDto.Response;
import com33.tag.entity.Tag;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-30T16:52:24+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.5.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class TagMapperImpl implements TagMapper {

    @Override
    public List<Response> tagToTagResponsesDto(List<Tag> tags) {
        if ( tags == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( tags.size() );
        for ( Tag tag : tags ) {
            list.add( tagToTagResponseDto( tag ) );
        }

        return list;
    }

    @Override
    public Response tagToTagResponseDto(Tag tags) {
        if ( tags == null ) {
            return null;
        }

        Response response = new Response();

        response.setTagId( tags.getTagId() );
        response.setTagName( tags.getTagName() );
        response.setTagCount( tags.getTagCount() );

        return response;
    }
}
