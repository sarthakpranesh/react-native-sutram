
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSutramSpec.h"

@interface Sutram : NSObject <NativeSutramSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Sutram : NSObject <RCTBridgeModule>
#endif

@end
