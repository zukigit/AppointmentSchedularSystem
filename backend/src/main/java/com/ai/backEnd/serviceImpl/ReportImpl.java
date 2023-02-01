package com.ai.backEnd.serviceImpl;

import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ai.backEnd.dto.ReportDTO;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.repository.AppointmentRepository;
import com.ai.backEnd.service.ReportService;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportImpl implements ReportService {

//	@Autowired
//	private Appointment app;
	
	@Autowired
	private AppointmentRepository repoApp;
	
	@Override
	public List<Appointment> getAllUserService() {
	try {
		List<ReportDTO>reportData=new ArrayList<ReportDTO>();
		List<Appointment> app = repoApp.findAll();
		for(Appointment a :app)
		{
			ReportDTO obj=new ReportDTO();
			obj.setName(a.getEmployee().get(0).getName().toString());
			obj.setAppointment_id(a.getAppointment_id().toString());
			//obj.setDate(a.getSchedules().get(0).getDate().toString());
			obj.setDescription(a.getDescription());
			obj.setTitle(a.getTitle());
			obj.setType(a.getType().toString());
			obj.setStart_time(a.getSchedules().get(0).getStart_time());
			obj.setEnd_time(a.getSchedules().get(0).getEnd_time());
			reportData.add(obj);
		}

		String reportPath = "C:\\Users\\LENOVO\\Desktop\\";

		// Compile the Jasper report from .jrxml to .japser
		JasperReport jasperReport = JasperCompileManager
				.compileReport(new File("").getAbsolutePath() + "\\src\\main\\resources\\Blank_A4.jrxml");
//		JasperReport report = JasperCompileManager
//				.compileReport(new File("").getAbsolutePath()
//						+"src/com/ztscorp/lms/reports/Blank-A4.jrxml");

		// Get your data source
		JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(reportData);

		// Add parameters
		Map<String, Object> parameters = new HashMap<>();

		parameters.put("createdBy", "DAT");

		// Fill the report
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
				jrBeanCollectionDataSource);

		// Export the report to a PDF file
		JasperExportManager.exportReportToPdfFile(jasperPrint, reportPath + "\\AllUser.pdf");

		System.out.println("Done");

		return app;
	} catch (Exception e) {
		e.printStackTrace();
		
	}
	return null;
	}

	@Override
	public List<Appointment> getRepoByUserId(List<String> user_ids) {
		LocalDate currentDate = LocalDate.now();
		try {
			List<ReportDTO>reportData=new ArrayList<ReportDTO>();
			List<Appointment> app = repoApp.getRepoByUserId(user_ids,currentDate);
			for(Appointment a :app)
			{
				ReportDTO obj=new ReportDTO();
				obj.setName(a.getEmployee().get(0).getName().toString());
				obj.setAppointment_id(a.getAppointment_id().toString());
				//obj.setDate(a.getSchedules().get(0).getDate().toString());
				obj.setDescription(a.getDescription());
				obj.setTitle(a.getTitle());
				obj.setType(a.getType().toString());
				obj.setStart_time(a.getSchedules().get(0).getStart_time());
				obj.setEnd_time(a.getSchedules().get(0).getEnd_time());
				reportData.add(obj);
			}

			String reportPath = "C:\\Users\\LENOVO\\Desktop\\";

			// Compile the Jasper report from .jrxml to .japser
			JasperReport jasperReport = JasperCompileManager
					.compileReport(new File("").getAbsolutePath() + "\\src\\main\\resources\\Blank_A4.jrxml");
//			JasperReport report = JasperCompileManager
//					.compileReport(new File("").getAbsolutePath()
//							+"src/com/ztscorp/lms/reports/Blank-A4.jrxml");

			// Get your data source
			JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(reportData);

			// Add parameters
			Map<String, Object> parameters = new HashMap<>();

			parameters.put("createdBy", "DAT");

			// Fill the report
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
					jrBeanCollectionDataSource);

			// Export the report to a PDF file
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportPath + "\\TodayAppointment.pdf");

			System.out.println("Done");

			return app;
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return null;
	}

}
