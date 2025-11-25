# Database Structure

I chose to use SQLite3 to store metadata

Each row contains:

ID  |   filename    |   title   |   description

Example:

{  
  "id": 1,  
  "filename": "Dryocampa_rubicunda.pdf",  
  "title": "Dryocampa rubicunda",  
  "description": "An article on the rosy maple moth."  
}

# Routing Structure

The structure of this website is quite simple

get('/') is the homepage, it shows a small text detailing the site  
and where to find the documents.

get('/documents') is the page to view documents. It displays their  
metadata and a link to open them at the next get 

get('/documents/:name') is where each file is served. It serves the  
file based on their name and checks if its valid before displaying

get('/404') is the page that displays when any invalid page is attempted to be loaded.  

