#####
# Title: insights.widgets.display.py
#
# Handlers to pretty up display
#
# Rev: $Revision: 819 $
# Author: $Author: jamesv $
#
#


###
# Function: splitThousands
#
# Adds delimiter between every third digit in long number strings
#
# Parameters:
#   s
#   tSep - left of decimal sep
#   dSep - right of decimal sep
#
# Returns:
#   *formatted string*
#
import logging

def splitThousands(s, tSep=',', dSep='.'):
    if s.rfind('.')>0:
        rhs=s[s.rfind('.')+1:]
        s=s[:s.rfind('.')]
        if len(s) <= 3: return s + dSep + rhs
        return splitThousands(s[:-3], tSep) + tSep + s[-3:] + dSep + rhs
    else:
        if len(s) <= 3: return s
        return splitThousands(s[:-3], tSep) + tSep + s[-3:]
