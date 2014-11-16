Table Creation Syntax

		USER
		
		ArticleMaster

		ScreenMaster

		ScreenArticle
		
		Images
	
	DROP TABLE USER;

	
CREATE DATABASE IF NOT EXISTS LCD_APP;
		
USER :
		
		CREATE TABLE IF NOT EXISTS `lcd_app`.`USER` (
		`USER_EMAIL_ID` VARCHAR(70) NOT NULL ,
		`ROLE_ID` VARCHAR(10) NOT NULL,
		`ACCESS_ENABLE_DT` DATE NOT NULL, 
		`ACCESS_DISABLE_DT` DATE NOT NULL,
		PRIMARY KEY (`USER_EMAIL_ID`))
		ENGINE = InnoDB
		DEFAULT CHARACTER SET = utf8
		COLLATE = utf8_bin;
	

ArticleMaster:
			
		CREATE TABLE IF NOT EXISTS `lcd_app`.`ArticleMaster` (
		 `ArticleId` INT AUTO_INCREMENT PRIMARY KEY,
		 `ContentType` VARCHAR(10) ,
		 `FilePath` VARCHAR(10) ,
		 `ArticleText` VARCHAR(1000),
		 `IsActive` CHAR(1) )
		ENGINE = InnoDB
		DEFAULT CHARACTER SET = utf8
		COLLATE = utf8_bin;
		
		
ScreenMaster:
		
		
		CREATE TABLE IF NOT EXISTS `lcd_app`.`ScreenMaster` (
		 `ScreenId` VARCHAR(16) PRIMARY KEY ,
		 `Location` CHAR(5) NOT NULL ,
		 `Building` VARCHAR(5) ,
		 `Floor` VARCHAR(2) ,
		 `Wing` VARCHAR(1) ,
		 `MacID` VARCHAR(15))
		ENGINE = InnoDB
		DEFAULT CHARACTER SET = utf8
		COLLATE = utf8_bin;
		
		
ScreenArticle:
		
		
		CREATE TABLE IF NOT EXISTS `lcd_app`.`ScreenArticle` (
		`Id` INT AUTO_INCREMENT PRIMARY KEY,
		`ArticleId` INT NOT NULL ,
		`ArticleType` VARCHAR(2) NOT NULL ,
		`ScreenId` VARCHAR(16) ,
		`StartTime` DATE ,
		`EndTime` DATE ,
		`IsActive` CHAR(1) DEFAULT 'N',
		
		CONSTRAINT `FKUSER_ArticleMaster_ArticleId`
		FOREIGN KEY `FKUSER_ArticleMaster_ArticleId` (ArticleId)
		REFERENCES `lcd_app`.`ArticleMaster` (ArticleId)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION ,
		
		CONSTRAINT FKUSER_ScreenMaster_ScreenId
		FOREIGN KEY FKUSER_ScreenMaster_ScreenId (ScreenId)
		REFERENCES lcd_app.ScreenMaster (ScreenId)
		ON DELETE CASCADE
		ON UPDATE CASCADE )
		ENGINE = InnoDB
		DEFAULT CHARACTER SET = utf8
		COLLATE = utf8_bin;
	
	
	Images:
	
		CREATE TABLE IF NOT EXISTS `lcd_app`.`Images` (
		`Id` INT AUTO_INCREMENT PRIMARY KEY,
		`ImageName` VARCHAR(100) NOT NULL ,
		`UploadedTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP )
		ENGINE = InnoDB
		DEFAULT CHARACTER SET = utf8
		COLLATE = utf8_bin;