import pandas as pd
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

def recommend_companies(data, user_skills, skill_match_threshold=0.5):
    user_skills = [skill.strip().lower() for skill in user_skills]
    total_skills = len(user_skills)
    
    recommendations = data[
        data['Skills Required'].apply(
            lambda x: (
                sum(skill in x.lower() for skill in user_skills) / total_skills
            ) >= skill_match_threshold if pd.notnull(x) else False
        )
    ]
    return recommendations

def format_detailed_recommendations(recommendations, user_skills):
    detailed_recommendations = []
    for index, row in recommendations.iterrows():
        matched_skills = [
            skill for skill in user_skills if skill.lower() in row['Skills Required'].lower()
        ]
        match_count = len(matched_skills)
        total_skills_required = len(row['Skills Required'].split(', '))
        
        detailed_recommendations.append(f"""
{index+1}. **{row['Profile']}**  
{row['Company']} · {row['Location']}  
Duration: {row['Duration']} | Stipend: {row['Stipend']}  

**Skills Match:** {match_count} of {total_skills_required} skills match your profile.  
**Skills Required:** {row['Skills Required']}  

To apply, type the number **{index+1}**.
---
""")
    return "\n".join(detailed_recommendations)

def send_email(to_email, subject, body, resume_path):
    try:
        sender_email = os.getenv("godgenoside@gmail.com")  
        sender_password = os.getenv("Nmit@123")  
        
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        if os.path.exists(resume_path):
            with open(resume_path, 'rb') as resume_file:
                attachment = MIMEBase('application', 'octet-stream')
                attachment.set_payload(resume_file.read())
                encoders.encode_base64(attachment)
                attachment.add_header('Content-Disposition', f"attachment; filename={os.path.basename(resume_path)}")
                message.attach(attachment)

            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.send_message(message)
            print(f"Application sent to {to_email}.")
        else:
            print(f"Resume not found at {resume_path}. Please check the file path.")
    except Exception as e:
        print(f"Error sending email: {e}")

file_path_companies = 'Copy of in_data(1) (1).xlsx'  
companies_data = pd.read_excel(file_path_companies)

user_skills_input = input("Enter your skills (comma-separated): ")
user_skills = [skill.strip() for skill in user_skills_input.split(",")]

recommended_companies = recommend_companies(companies_data, user_skills, skill_match_threshold=0.5)

if not recommended_companies.empty:
    print("Here are your recommended job opportunities:\n")
    detailed_recommendations = format_detailed_recommendations(recommended_companies, user_skills)
    print(detailed_recommendations)
    
    try:
        apply_choice = int(input(f"Enter the number of the job you want to apply for (1 to {len(recommended_companies)}): "))
        
        if 1 <= apply_choice <= len(recommended_companies):
            selected_company = recommended_companies.iloc[apply_choice - 1]

            user_email = input("Enter your email address: ")
            resume_path = input("Enter the path to your resume (e.g., /path/to/resume.pdf): ")

            send_email(
                to_email="company-email@example.com",  
                subject=f"Application for {selected_company['Profile']} at {selected_company['Company']}",
                body=f"Dear Hiring Team,\n\nI am interested in the {selected_company['Profile']} role at {selected_company['Company']}. Please find my resume attached.\n\nBest regards,\n{user_email}",
                resume_path=resume_path
            )
        else:
            print(f"Invalid choice. Please select a valid job number between 1 and {len(recommended_companies)}.")
    except ValueError:
        print("Invalid input. Please enter a valid number.")
else:
    print("No companies match your skills.")
