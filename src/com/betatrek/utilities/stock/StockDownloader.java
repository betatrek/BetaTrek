package com.betatrek.utilities.stock;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;



public class StockDownloader {
	DateFormat df =  new SimpleDateFormat ("yyyy-MM-dd");
	FileWriter fstream;
	BufferedWriter out;

	public StockDownloader() {

		try {
			fstream = new FileWriter("stock.txt");
			out = new BufferedWriter(fstream);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	public void DownloadDataFromWeb(String symbol){
		Calendar cal = Calendar.getInstance();
		cal.set(1900, Calendar.JANUARY, 1);
		Date startDate = cal.getTime();
		String baseURL = "http://ichart.finance.yahoo.com/table.csv?";
		cal.setTime(new Date());
		String queryText = BuildHistoricalDataRequest(symbol, startDate, cal.getTime());
		String url =  baseURL + queryText;

		//Get page showing the table with the chosen indices
		getResponse(url);
	}

	public String getResponse (String url) {
		System.out.println(url);
		StringBuffer sb = new StringBuffer();
		GetMethod method = null;
		try {
			method = new GetMethod(url);
			HttpClient client = new HttpClient();
			client.executeMethod(method);
			InputStream inputStream = method.getResponseBodyAsStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
			String csvLine;
			out.write(reader.readLine()); //first line is header
			out.write("\n");
			while ((csvLine = reader.readLine()) != null) {
				String[] sa = csvLine.split(",");
				Date date = df.parse(sa[0].trim());
				Double open =  Double.parseDouble(sa[1]);
				Double high = Double.parseDouble(sa[2]);
				Double low = Double.parseDouble(sa[3]);
				Double close = Double.parseDouble(sa[4]);
				Double volume = Double.parseDouble(sa[5]);
				Double adjClose = Double.parseDouble(sa[6]);
				// Process the data (e.g. insert into DB)
				//System.out.println(date+"\t"+open+"\t"+high+"\t"+low+"\t"+close+"\t"+volume+"\t"+adjClose);
				out.write(date+"\t"+open+"\t"+high+"\t"+low+"\t"+close+"\t"+volume+"\t"+adjClose);
				out.write("\n");
			}
			inputStream.close();
		}  catch (Exception e) {
			e.printStackTrace();
		}finally {
			if (method!=null)
				method.releaseConnection();
		}  
		return sb.toString();
	}

	public String BuildHistoricalDataRequest(String symbol, Date startDate, Date endDate){
		// We're subtracting 1 from the month because yahoo
		// counts the months from 0 to 11 not from 1 to 12.
		StringBuilder request = new StringBuilder();
		Calendar cal = Calendar.getInstance();
		cal.setTime(startDate);
		request.append("s=").append(symbol);
		request.append("&a=").append(cal.get(Calendar.MONTH));
		request.append("&b=").append(cal.get(Calendar.DAY_OF_MONTH));
		request.append("&c=").append(cal.get(Calendar.YEAR));
		cal.setTime(endDate);
		request.append("&d=").append(cal.get(Calendar.MONTH));
		request.append("&e=").append(cal.get(Calendar.DAY_OF_MONTH));
		request.append("&f=").append(cal.get(Calendar.YEAR));
		request.append("&g=").append("d"); //daily
		return request.toString();
	}

	public void closeFile() {
		try {
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String args[]){
		StockDownloader dl = new StockDownloader();
		dl.DownloadDataFromWeb("AAAGX");
		dl.closeFile();
	}
}
