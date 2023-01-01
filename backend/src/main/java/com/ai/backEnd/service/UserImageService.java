package com.ai.backEnd.service;

import com.ai.backEnd.model.UserImage;

public interface UserImageService {

	void deleteImageById(int photo_id);
	void deleteImage(UserImage userImage);
}
