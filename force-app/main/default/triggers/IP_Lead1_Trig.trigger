trigger IP_Lead1_Trig on Lead (before insert) 
{
	// When ever Lead is created with LeadSource as Web then give rating as cold otherwise hot.
	for(Lead l : trigger.new)
    {
        l.Rating = (l.LeadSource == 'Web') ? 'Cold' : 'Hot';
    }
}