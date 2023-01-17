package com.ai.backEnd.serviceImpl;


import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.ai.backEnd.model.UserImage;
import com.ai.backEnd.repository.UserImageRepo;
@SpringBootTest
class UserImageImplTest {
	@Mock
	UserImageRepo userImageRepo;
	
	@InjectMocks
	UserImageImpl userImpl;

	@Test
	void deleteImageById() {
		userImpl.deleteImageById(1);
		verify(userImageRepo,times(1)).deleteById(1);
		
	}
	@Test
	void deleteImage() {
		UserImage userimage=new UserImage();
		userImpl.deleteImage(userimage);
		verify(userImageRepo,times(1)).delete(userimage);
		
	}

}
