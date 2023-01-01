package com.ai.backEnd.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ai.backEnd.model.UserImage;
import com.ai.backEnd.repository.UserImageRepo;
import com.ai.backEnd.service.UserImageService;

@Service
public class UserImageImpl implements UserImageService{
	
	@Autowired
	private UserImageRepo userImageRepo;

	@Override
	public void deleteImageById(int photo_id) {
		userImageRepo.deleteById(photo_id);
	}

	@Override
	public void deleteImage(UserImage userimage) {
		userImageRepo.delete(userimage);
	}
}
