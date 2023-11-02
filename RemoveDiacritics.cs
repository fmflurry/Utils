private static string Sanitize(string stringToSanitize)
{
  if (string.IsNullOrEmpty(stringToSanitize))
  {
    return string.Empty;
  }
  
  // Use full canonical decomposition to iterate and check unicode category
  var normalizedIdentifier = stringToSanitize.Normalize(System.Text.NormalizationForm.FormD);
  var stringBuilder = new StringBuilder();
  
  for (int i = 0; i < normalizedIdentifier.Length; i++)
  {
    char c = normalizedIdentifier[i];
    var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
    
    if (unicodeCategory != UnicodeCategory.NonSpacingMark
                        && unicodeCategory != UnicodeCategory.OtherPunctuation
                        && unicodeCategory != UnicodeCategory.OpenPunctuation
                        && unicodeCategory != UnicodeCategory.DashPunctuation
                        && unicodeCategory != UnicodeCategory.SpaceSeparator)
    {
      stringBuilder.Append(c.ToString().Normalize(NormalizationForm.FormC));
    }
  }
  
  return stringBuilder.ToString();      
}
