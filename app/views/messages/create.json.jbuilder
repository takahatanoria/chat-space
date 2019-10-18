json.content @message.content
json.created_at @message.created_at.to_s
json.name @message.user.name
json.image @message.image.url
json.id @message.id