package com.ai.backEnd.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserImage {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer image_id;
	private String image_name;
	private String image_content_type;
	private byte[] data;
	
	public int getImage_id() {
		return image_id;
	}
	public void setImage_id(int image_id) {
		this.image_id = image_id;
	}
	public String getImage_name() {
		return image_name;
	}
	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}
	public String getImage_content_type() {
		return image_content_type;
	}
	public void setImage_content_type(String image_content_type) {
		this.image_content_type = image_content_type;
	}
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}
}
